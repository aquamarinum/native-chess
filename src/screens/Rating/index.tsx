import React, {useEffect, useState} from 'react';
import InDev from '../InDev';
import {FlatList, ScrollView, Text, View} from 'react-native';
import Firestore from '../../services/firebase/Firestore';
import {FetchStatus} from '../../types/FetchStatus';

const Rating = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Firestore.getAllUsers()
      .then(res => {
        if (res !== FetchStatus.FAILED) {
          console.log(res[0].data.email);
          //@ts-ignore
          setUsers(res);
        }
      })
      .catch(error => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <FlatList
      data={users}
      renderItem={({item}) => (
        <View>
          <Text>{item._data.name}</Text>
        </View>
      )}
    />
  );
};

export default Rating;
