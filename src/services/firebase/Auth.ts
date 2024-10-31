import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {SignStatuses} from '../validation/SignStatuses';
import {User} from '../../types/User';

class Auth {
  private errorHandler = (error: any) => {
    switch (error.code) {
      case 'auth/wrong-password':
        return SignStatuses.WRONGPASS;
      case 'auth/user-not-found':
        return SignStatuses.NOTFOUND;
      case 'auth/invalid-email':
        return SignStatuses.BADEMAIL;
      default:
        return SignStatuses.FAILED;
    }
  };

  signUp = async (user: User) => {
    try {
      const userCredential: FirebaseAuthTypes.UserCredential =
        await auth().createUserWithEmailAndPassword(user.email, user.password);
      const uid = userCredential.user.uid;
      user.country = 'World';
      user.username = 'betatester';
      user.registrated =
        new Date().toDateString() + '-' + new Date().toLocaleTimeString();
      await firestore().collection('users').doc(uid).set(user);
      return SignStatuses.SUCCESS;
    } catch (error) {
      return this.errorHandler(error);
    }
  };

  signIn = async (email: string, password: string) => {
    try {
      const userCredential: FirebaseAuthTypes.UserCredential =
        await auth().signInWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;
      const userDoc = await firestore().collection('users').doc(uid).get();

      if (userDoc.exists) {
        //return SignStatuses.SUCCESS;
        return userDoc.data();
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  signOut = async () => {
    try {
      await auth().signOut();
      return SignStatuses.SUCCESS;
    } catch (error) {
      return this.errorHandler(error);
    }
  };

  getUser = () => {
    return auth().currentUser;
  };

  getUserId = () => {
    const id = auth().currentUser?.uid;
    if (id) return id;
    return '00000000';
  };

  subscribe = (stateChanger: (user: FirebaseAuthTypes.User | null) => void) => {
    return auth().onAuthStateChanged(stateChanger);
  };
}

export default new Auth();
