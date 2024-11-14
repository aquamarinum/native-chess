import firestore from '@react-native-firebase/firestore';
import {FetchStatus} from '../../types/FetchStatus';
import {User} from '../../types/User';
import Auth from './Auth';

class Firestore {
  private store;
  constructor() {
    this.store = firestore().collection('users');
  }
  createUser = async (user: User) => {
    try {
      const uid = Auth.getUserId();
      if (uid) {
        user.uid = uid;
        user.registrated =
          new Date().toLocaleDateString() + new Date().toLocaleTimeString();
        user.country = 'world';
        user.username = 'beta-test-user';
        user.bio = 'DEFAULT';
        await this.store.doc(user.uid).set(user);
        return FetchStatus.SUCCESS;
      }
      return FetchStatus.FAILED;
    } catch (error) {
      return FetchStatus.FAILED;
    }
  };
  getUserById = async (id: string) => {
    try {
      const user = await this.store.doc(id).get();
      return user;
    } catch (error) {
      return FetchStatus.FAILED;
    }
  };
  getAllUsers = async () => {
    try {
      const users = await this.store.get();
      return users.docs;
    } catch (error) {
      return FetchStatus.FAILED;
    }
  };
  updateUser = async (user: User) => {
    try {
      await this.store.doc(user.uid).set(user);
      return FetchStatus.SUCCESS;
    } catch (error) {
      return FetchStatus.FAILED;
    }
  };
  deleteUser = async (id: string) => {
    try {
      await this.store.doc(id).delete();
      return FetchStatus.SUCCESS;
    } catch (error) {
      return FetchStatus.FAILED;
    }
  };
}

export default new Firestore();
