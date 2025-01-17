import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import {getDatabase, ref, onValue} from 'firebase/database'
import { useEffect, useState } from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'clave/');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setUsers(usersList);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='title'>Claves</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <IonContent>
        <IonGrid className='grid'>
          <IonRow>
            <IonCol className='clave'>Key</IonCol>
            <IonCol className='clave'>Key Owner</IonCol>
            <IonCol className='clave'>Status</IonCol>
          </IonRow>
          {users.map((user) => (
            <IonRow key={user.id}>
              <IonCol>
                <div className='status'>{user.id}</div>
              </IonCol>
              <IonCol>
                <div className='status'>{user.user_id}</div>
              </IonCol>
              <IonCol>
                <div className='status'>{user.status}</div>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
       </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
