import {ReactNativeFirebase} from '@react-native-firebase/app';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

class Auth {
  signUp = async (email: string, password: string) => {
    try {
      auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  signIn = async (email: string, password: string) => {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        console.error('Неправильный пароль!');
      } else if (error.code === 'auth/user-not-found') {
        console.error('Пользователь не найден!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('Некорректный email!');
      } else {
        console.error('Произошла неизвестная ошибка:', error);
      }
    }
  };

  signOut = async () => {
    try {
      auth().signOut();
    } catch (error) {
      console.error('Error during sign out:', error);
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
