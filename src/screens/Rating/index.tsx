import React, {useEffect, useState} from 'react';
import InDev from '../InDev';
import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import Firestore from '../../services/firebase/Firestore';
import {FetchStatus} from '../../types/FetchStatus';
import Wrapper from '../../components/Wrapper';
import {queen_white_icon} from '../../assets/img/chess';
import Subtitle from '../../components/Subtitle';
import {styles} from './styles';

const Rating = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Firestore.getAllUsers()
      .then(res => {
        if (res !== FetchStatus.FAILED) {
          console.log(res);
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
    <Wrapper>
      <FlatList
        style={styles.list}
        data={users}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <View style={styles.imageContainer}>
              <Image source={queen_white_icon} style={styles.image} />
            </View>
            <Subtitle>{item._data.name}</Subtitle>
            <Subtitle>{item._data.elo}</Subtitle>
          </View>
        )}
      />
    </Wrapper>
  );
};

export default Rating;
