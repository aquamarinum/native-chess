import AsyncStorage from '@react-native-async-storage/async-storage';

type AsyncStorageDataType = {
  theme: string;
  language: string;
};

const key = 'nativeChessConfig';

class AsyncStorageService {
  storeData = async (value: AsyncStorageDataType) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      return false;
    }
  };

  getData: () => Promise<AsyncStorageDataType | null> = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      return null;
    }
  };
}

export default new AsyncStorageService();
