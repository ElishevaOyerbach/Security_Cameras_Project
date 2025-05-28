
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useSelector } from 'react-redux';
import AxiosGetUserById from './AxiosGetUserById';
import AxiosGetAdministratorIdByMember from '../GetAllSecurityCameras/AxiosGetAdministratorIdByMember';
import MultiLineChart from './MultiAnalysFromAdmin';
import RequestAccessButton from '../AccessRequest/RequestAccessButton';
import AccessRequestDialog from '../AccessRequest/AccessRequestDialog';

const ControlPanel = () => {
  const user = useSelector((state) => state.UserSlice);
  const [userAll, setUserAll] = useState(null);
  const [finalAdminID, setFinalAdminID] = useState(null);
  const [arrAskForAccess, setArrAskForAccess] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!user?._id) return;
      try {
        let adminIdToUse = user._id;
        if (user.role === "Member") {
          adminIdToUse = await AxiosGetAdministratorIdByMember(user._id);
        }
        setFinalAdminID(adminIdToUse); // עדכון לצורך MultiLineChart
        const data = await AxiosGetUserById(adminIdToUse);
        setUserAll(data.user);
        if (user?.role === "Administrator") {
          setArrAskForAccess(data.user.arrAskForAccess || []);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    init();
  }, [user?._id]);

  const handleApprove = (request) => {
    console.log('אושר:', request);
    // כתיבה לשרת, עדכון סטייט וכו'
  };

  const handleReject = (request) => {
    console.log('נדחה:', request);
    // כתיבה לשרת, עדכון סטייט וכו'
  };

  return (

    <div style={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#2b2f3f',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {user?.role === "Member" && (
          <>
            <RequestAccessButton />
            <AccessRequestDialog
              visible={showDialog}
              onHide={() => setShowDialog(false)}
              requests={arrAskForAccess}
              onApprove={(req) => console.log('אושר:', req)}
              onReject={(req) => console.log('נדחה:', req)}
            />
          </>
        )}

        {user?.role === "Administrator" && arrAskForAccess.length > 0 && (
          <>
            <button
              style={{
                background: '#00d084',
                color: '#ffffff',
                border: 'none',
                padding: '0.8rem 1.6rem',
                fontWeight: '500',
                borderRadius: '50px',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}

              onClick={() => setShowDialog(true)}
            >
              <div>
  <i className="pi pi-users" style={{ fontSize: '2rem', marginRight: '0.5rem' }}></i>
  
  {arrAskForAccess.length > 0 && (
    <span
      style={{
         outline: 'none' ,
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: 'white',     // עיגול לבן
        color: '#28a745',             // טקסט ירוק כהה
        borderRadius: '50%',
        padding: '2px 7px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        minWidth: '20px',
        textAlign: 'center',
        boxShadow: '0 0 2px rgba(0,0,0,0.2)'
      }}
    >
      {arrAskForAccess.length}
    </span>
  )}
</div>

            </button>

            <AccessRequestDialog
              visible={showDialog}
              onHide={() => setShowDialog(false)}
              requests={arrAskForAccess}
            />
          </>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}>
          {[{
            icon: 'pi-camera',
            title: 'Active Cameras',
            value: userAll?.arrSecurityCameras?.length ?? '...',
          }, {
            icon: 'pi-upload',
            title: 'Last Month Uploads',
            value: userAll?.arrMembers?.length ?? '...',
          }, {
            icon: 'pi-users',
            title: 'Number of Members',
            value: userAll?.arrMembers?.length ?? '...',
            subtitle: (
              <div style={{ fontSize: '0.85rem', color: '#cccccc' }}>
                Since last week <span style={{ color: '#29cc8b' }}>▲ 12%</span>
              </div>
            )
          }].map((card, index) => (
            <Card
              key={index}
              title={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <i className={`pi ${card.icon}`} style={{ fontSize: '1.8rem', marginRight: '0.5rem', color: '#00d084' }}></i>
                  <span style={{ color: '#ffffff' }}>{card.title}</span>
                </span>

              }

              style={{
                backgroundColor: '#383c4d',
                minWidth: '250px',
                minHeight: '160px',
                width: '250px',
                flexGrow: 1,
                textAlign: 'left',
                color: '#ffffff',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 0 10px #00000030',
              }}
            >
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#ffffff'
              }}>
                {card.value}
              </div>
              {card.subtitle && card.subtitle}
            </Card>
          ))}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <Card
            title={<span style={{ color: '#ffffff' }}>The last four Security cameras uploaded</span>}
            style={{
              backgroundColor: '#383c4d',
              color: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 0 10px #00000030',
            }}
          >
            {finalAdminID ? (
              <MultiLineChart adminID={finalAdminID} />
            ) : (
              <div style={{
                backgroundColor: '#383c4d',
                height: '200px',
                borderRadius: '8px',
                textAlign: 'center',
                lineHeight: '200px',
                color: '#ffffff',
                fontWeight: 'bold',
                boxShadow: '0 0 10px #ffffff20',
              }}>
                Loading chart...
              </div>
            )}
          </Card>

        </div>
      </div>
    </div>
  )
}


export default ControlPanel
