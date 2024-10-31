import React, {useEffect, useState} from 'react';
import MainButton from '../../components/MainButton';
import {useTranslation} from 'react-i18next';
import Wrapper from '../../components/Wrapper';
import {Alert, FlatList} from 'react-native';
import {styles} from './styles';
import GameCard from '../../components/GameCard';
import {navigate} from '../../services/navigator/Navigator';
import Firestore from '../../services/firebase/Firestore';
import Auth from '../../services/firebase/Auth';
import {FetchStatus} from '../../types/FetchStatus';
import {useAppDispatch} from '../../redux/store';
import {setUser} from '../../redux/user/slice';
import Splash from '../Splash';

const Home = () => {
  const {t} = useTranslation();
  const [error, setError] = useState(FetchStatus.SUCCESS);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    Firestore.getUser(Auth.getUserId())
      .then(res => {
        if (res !== FetchStatus.FAILED) {
          console.log('RES DATA', res.data());
          //@ts-ignore
          //dispatch(setUser(res.data()));
        }
      })
      .catch(err => setError(FetchStatus.FAILED))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Splash />;

  if (error !== FetchStatus.SUCCESS) Alert.alert('Error in getting user');

  return (
    <Wrapper>
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <GameCard
            title="Game #1"
            subtitle="Bla bla blafghj asdad ad"
            league="silver"
            onClick={() => navigate('Game')}
            image={undefined}
            league_icon={undefined}
          />
        )}
        keyExtractor={num => num.toString()}
      />
      <MainButton
        content={t('buttonPlay')}
        active={true}
        onClick={() => navigate('GameMode')}
      />
    </Wrapper>
  );
};

export default Home;
