import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import UploadVideo from './UploadVideo/UploadVidea';
import { Link } from 'react-router-dom';
import AxiosPeoplePerMinute from './Analys/AxiosPeoplePerMinute';
import AxiosDelete from './DeleteVideo/AxiosDelete';
import AxiosGetAdministratorIdByMember from './GetAllSecurityCameras/AxiosGetAdministratorIdByMember';
import HasPermission from './AddMembers/hasPermission';
import AxiosGetUserById from './ControlPanel/AxiosGetUserById';

const GetSecurity = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminId, setAdminID] = useState("");
  const user = useSelector((state) => state.UserSlice);

  const [fullUser, setFullUser] = useState(null);
  useEffect(() => {
    const fetchAdminId = async () => {
      if (!user?._id) return;
      if (user.role !== "Member") {
        setAdminID(user._id);
        return;
      }
      try {
        try {
          const full = await AxiosGetUserById(user._id);
          setFullUser(full);
          const id = await AxiosGetAdministratorIdByMember(full.user._id);
          setAdminID(id);
        } catch (error) {
          console.error("שגיאה בשליפת מזהה מנהל:", error);
        }


        console.log(">>> user:", user._id);
        console.log(">>> user:", fullUser.user._id);
        console.log(">>> fullUser:", fullUser);

        const id = await AxiosGetAdministratorIdByMember(fullUser.user._id);
        setAdminID(id);
      } catch (error) {
        console.error("שגיאה בשליפת מזהה מנהל:", error);
      }
    };

    fetchAdminId();
  }, [user]);


  useEffect(() => {
    if (!adminId) return;

    const fetchVideos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:8080/Administators/getAllSecurityCamerasByAdministrator/${adminId}`
        );
        const videoData = data.map((v) => ({
          id: v._id,
          filePath: v.filePath,
          fileName: v.filePath?.slice(8),
          date: v.date,
        }));
        setVideos(videoData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [adminId]);

  const VideoCard = ({ video }) => {
    const [playing, setPlaying] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const videoRef = useRef(null);
    const videoUrl = `http://localhost:8080/videos/${video.fileName}`;
    const { data: chartData, loading: chartLoading } = AxiosPeoplePerMinute({ recordingId: video.id });

    const [isCanDeleteSecurity, setIsCanDeleteSecurity] = useState(true);

    useEffect(() => {
      if (!fullUser?.user?.AccessPermissions) return;
      const canAdd = HasPermission("add security", fullUser.user.AccessPermissions, user.role);
      setIsCanDeleteSecurity(canAdd);
    }, [fullUser, user.role]);

    const togglePlay = () => {
      if (!videoRef.current) return;
      playing ? videoRef.current.pause() : videoRef.current.play();
      setPlaying(!playing);
    };

    const handleDelete = async () => {
      await AxiosDelete({
        recordingId: video.id,
        onDeleteSuccess: () => {
          setVideos((prev) => prev.filter((v) => v.id !== video.id));
        }
      });
      setShowDeleteDialog(false);
    };

    const formattedDate = new Date(video.date).toLocaleDateString('he-IL');
    const formattedTime = new Date(video.date).toLocaleTimeString('he-IL');

    return (
      <div
        style={{
          width: '380px',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '3px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-text"
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            zIndex: 2,
            color: 'white',
          }}
          disabled={!isCanDeleteSecurity}
          onClick={() => setShowDeleteDialog(true)}
        />

        <Dialog
          visible={showDeleteDialog}
          style={{ width: '350px' }}
          header="אישור מחיקה"
          modal
          className="p-fluid"
          onHide={() => setShowDeleteDialog(false)}
          footer={
            <div>
              <Button label="לא" icon="pi pi-times" onClick={() => setShowDeleteDialog(false)} className="p-button-text" />
              <Button label="כן, מחק" icon="pi pi-check" onClick={handleDelete} className="p-button-danger" />
            </div>
          }
        >
          <span>האם את/ה בטוח/ה שברצונך למחוק את הסרטון?</span>
        </Dialog>

        <div
          style={{
            height: '180px',
            backgroundColor: '#ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <video
            ref={videoRef}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          <Button
            icon={playing ? 'pi pi-pause' : 'pi pi-play'}
            className="p-button-rounded p-button-outlined"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '2px solid white',
            }}
            onClick={togglePlay}
          />
        </div>

        <div className="p-3" style={{ color: 'white', direction: 'rtl' }}>
          <div className="flex justify-content-between align-items-center mb-2">
            <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{formattedDate} {formattedTime}</div>
            <div>
              <Link
                to={{
                  pathname: "/analysis",
                }}
                state={{ showChart: true, recordingName: video.fileName, ID_video: video.id, peopleData: chartData }}
              >
                <Button
                  className="p-button-sm p-button-text"
                  style={{
                    color: '#29cc8b',
                    backgroundColor: 'transparent',
                    border: '1px solid #29cc8b',
                    boxShadow: '0 0 8px #29cc8b',
                  }}
                >
                  <span className="pi pi-chart-line" style={{ fontSize: '1.8rem', color: 'var(--accent-green)' }}></span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div>טוען...</div>;

  return (
    <div className="p-4" style={{ direction: 'rtl' }}>
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.5rem' }}>Cameras</div>
          <div style={{ color: '#ffffff' }}>  All security cameras</div>
        </div>
        <div className="flex gap-2">
          <UploadVideo />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
        }}
      >
        {videos.map((video) => (
          <VideoCard key={video.fileName} video={video} />
        ))}
      </div>
    </div>
  );
};

export default GetSecurity;

