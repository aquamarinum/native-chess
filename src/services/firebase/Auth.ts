import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SignStatuses} from '../validation/SignStatuses';

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

  signUp = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      return SignStatuses.SUCCESS;
    } catch (error) {
      return this.errorHandler(error);
    }
  };

  signIn = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return SignStatuses.SUCCESS;
    } catch (error: any) {
      return this.errorHandler(error);
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

  subscribe = (stateChanger: (user: FirebaseAuthTypes.User | null) => void) => {
    return auth().onAuthStateChanged(stateChanger);
  };
}

export default new Auth();
