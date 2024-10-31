import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {User} from '../types/User';

export function useAuth() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        if (userDoc.exists) {
          //@ts-ignore
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userData;
}
