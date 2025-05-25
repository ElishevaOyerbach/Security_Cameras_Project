// import React, { useEffect, useState } from 'react';
// import { Card } from 'primereact/card';
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import AxiosGetCountMember from './AxiosGetCountMember';
// import { useSelector } from 'react-redux';
// import AxiosGetUserById from './AxiosGetUserById';

// const styles = {
//   container: {
//     direction: 'ltr',
//     padding: '2rem',
//     paddingLeft: '18rem',
//     fontFamily: 'sans-serif',
//     backgroundColor: '#f8f9fc',
//     boxSizing: 'border-box',
//   },
//   header: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start',
//     gap: '1rem',
//     marginBottom: '2rem',
//   },
//   btn: {
//     padding: '0.5rem 1rem',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//   },
//   primaryBtn: {
//     backgroundColor: '#0056d2',
//     color: 'white',
//   },
//   cardsRow: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//     gap: '1rem',
//     marginBottom: '2rem',
//   },
//   cardTitle: {
//     display: 'flex',
//     alignItems: 'center',
//     fontSize: '1.1rem',
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   cardIcon: {
//     fontSize: '2.5rem',
//     marginRight: '1rem',
//     color: '#0056d2',
//   },
//   value: {
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//   },
//   subtext: {
//     fontSize: '0.85rem',
//     color: '#666',
//   },
//   green: { color: 'green' },
//   red: { color: 'red' },
//   chartCard: {
//     marginBottom: '2rem',
//   },
//   chartPlaceholder: {
//     backgroundColor: '#e8f1ff',
//     height: '200px',
//     borderRadius: '8px',
//     textAlign: 'center',
//     lineHeight: '200px',
//     color: '#555',
//     fontWeight: 'bold',
//   },
//   chartFooter: {
//     fontSize: '0.85rem',
//     textAlign: 'center',
//     marginTop: '1rem',
//     color: '#666',
//   },
// };

// const ControlPanel = () => {

//   const user = useSelector((state) => state.UserSlice);
//   console.log("user._id is", user?._id);

//   const [userAll, setUserAll] = useState(null);
//   useEffect(() => {
//     if (user?._id) {
//       AxiosGetUserById({ id: user._id, onResult: setUserAll });
//     }
//   }, [user?._id]); { console.log(userAll) }
//   //const admin = useSelector((state) => state.AdministratorSlice);
//   const { count: cameraCount } = AxiosGetCountMember(userAll?._id, 'getRecentCameraCountByAdministrator');

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <button style={{ ...styles.btn, ...styles.primaryBtn }}>View Cameras</button>
//         <button style={styles.btn}>System Settings</button>
//       </div>

//       <div style={styles.cardsRow}>
//         <Card
//           title={
//             <span style={styles.cardTitle}>
//               <i className="pi pi-video" style={styles.cardIcon}></i>
//               Today's Recordings
//             </span>
//           }
//         >
//           <div style={styles.value}>5</div>
//           <div style={styles.subtext}>
//             Since last week <span style={styles.green}>▲ 8%</span>
//           </div>
//         </Card>

//         <Card
//           title={
//             <span style={styles.cardTitle}>
//               <i className="pi pi-camera" style={styles.cardIcon}></i>
//               Active Cameras
//             </span>
//           }
//         >
//           <div style={styles.value}>{userAll?.arrSecurityCameras.length??'...'}</div>
//         </Card>

//         <Card
//           title={
//             <span style={styles.cardTitle}>
//               <i className="pi pi-upload" style={styles.cardIcon}></i>
//               Last Month Uploads
//             </span>
//           }
//         >
//           <div style={styles.value}>{cameraCount}</div>
//         </Card>

//         <Card
//           title={
//             <span style={styles.cardTitle}>
//               <i className="pi pi-users" style={styles.cardIcon}></i>
//               Number of Members
//             </span>
//           }
//         >
//           <div style={styles.value}>{userAll?.arrMembers.length??'...'}</div>
//           <div style={styles.subtext}>
//             Since last week <span style={styles.green}>▲ 12%</span>
//           </div>
//         </Card>
//       </div>

//       <div style={styles.chartCard}>
//         <Card title="Visitors Throughout the Day">
//           <div style={styles.chartPlaceholder}>[Visitor Chart]</div>
//           <div style={styles.chartFooter}>
//             Peak Hours: 12:00–14:00 | Daily Avg: 38 Visitors
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ControlPanel;
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AxiosGetCountMember from './AxiosGetCountMember';
import { useSelector } from 'react-redux';
import AxiosGetUserById from './AxiosGetUserById';

const styles = {
  container: {
    direction: 'ltr',
    padding: '2rem',
    paddingLeft: '18rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#f8f9fc',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '1rem',
    marginBottom: '2rem',
  },
  btn: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  primaryBtn: {
    backgroundColor: '#0056d2',
    color: 'white',
  },
  cardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginRight: '1rem',
    color: '#0056d2',
  },
  value: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: '0.85rem',
    color: '#666',
  },
  green: { color: 'green' },
  red: { color: 'red' },
  chartCard: {
    marginBottom: '2rem',
  },
  chartPlaceholder: {
    backgroundColor: '#e8f1ff',
    height: '200px',
    borderRadius: '8px',
    textAlign: 'center',
    lineHeight: '200px',
    color: '#555',
    fontWeight: 'bold',
  },
  chartFooter: {
    fontSize: '0.85rem',
    textAlign: 'center',
    marginTop: '1rem',
    color: '#666',
  },
};

const ControlPanel = () => {
  const user = useSelector((state) => state.UserSlice);
  console.log("user._id is", user?._id);
  console.log("user is", user);
  const [userAll, setUserAll] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?._id) {
        try {
          const data = await AxiosGetUserById(user._id);
          console.log("Fetched user data:", data.user);
          setUserAll(data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchData();
  }, [user?._id]);

  const { count: cameraCount } = AxiosGetCountMember(userAll?._id, 'getRecentCameraCountByAdministrator');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={{ ...styles.btn, ...styles.primaryBtn }}>View Cameras</button>
        <button style={styles.btn}>System Settings</button>
      </div>

      <div style={styles.cardsRow}>
        <Card
          title={
            <span style={styles.cardTitle}>
              <i className="pi pi-video" style={styles.cardIcon}></i>
              Today's Recordings
            </span>
          }
        >
          <div style={styles.value}>5</div>
          <div style={styles.subtext}>
            Since last week <span style={styles.green}>▲ 8%</span>
          </div>
        </Card>

        <Card
          title={
            <span style={styles.cardTitle}>
              <i className="pi pi-camera" style={styles.cardIcon}></i>
              Active Cameras
            </span>
          }
        >
          <div style={styles.value}>{userAll?.arrSecurityCameras?.length ?? '...'}</div>
        </Card>

        <Card
          title={
            <span style={styles.cardTitle}>
              <i className="pi pi-upload" style={styles.cardIcon}></i>
              Last Month Uploads
            </span>
          }
        >
          <div style={styles.value}>{cameraCount}</div>
        </Card>

        <Card
          title={
            <span style={styles.cardTitle}>
              <i className="pi pi-users" style={styles.cardIcon}></i>
              Number of Members
            </span>
          }
        >
          <div style={styles.value}>{userAll?.arrMembers?.length ?? '...'}</div>
          <div style={styles.subtext}>
            Since last week <span style={styles.green}>▲ 12%</span>
          </div>
        </Card>
      </div>

      <div style={styles.chartCard}>
        <Card title="Visitors Throughout the Day">
          <div style={styles.chartPlaceholder}>[Visitor Chart]</div>
          <div style={styles.chartFooter}>
            Peak Hours: 12:00–14:00 | Daily Avg: 38 Visitors
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ControlPanel;
