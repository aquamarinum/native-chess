import React, {useEffect, useState} from 'react';
import MainButton from '../../components/MainButton';
import {useTranslation} from 'react-i18next';
import Wrapper from '../../components/Wrapper';
import {Alert, FlatList} from 'react-native';
import {styles} from './styles';
import GameCard from '../../components/GameCard';
import {navigate} from '../../services/navigator/Navigator';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {userSelector} from '../../redux/user/selectors';
import Auth from '../../services/firebase/Auth';
import Firestore from '../../services/firebase/Firestore';
import {FetchStatus} from '../../types/FetchStatus';
import Popup from '../../components/Popup';
import ShadowButton from '../../components/ShadowButton';
import Splash from '../Splash';
import {
  setBio,
  setElo,
  setEmail,
  setName,
  setRegistrated,
  setUID,
  setUser,
  setUsername,
} from '../../redux/user/slice';

const Home = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uid = Auth.getUserId();
    console.log('HOME UID: ', uid);
    if (uid) {
      setLoading(true);
      Firestore.getUserById(uid)
        .then(res => {
          if (res !== FetchStatus.FAILED) {
            //@ts-ignore
            const data = res._data;
            dispatch(setName(data.name));
            dispatch(setUsername(data.username));
            dispatch(setUID(data.uid));
            dispatch(setElo(data.elo));
            dispatch(setEmail(data.email));
          }
        })
        .catch(err => setError(true))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <Splash />;

  return (
    <Wrapper>
      <Popup
        header={t('En error occured')}
        text={t('Invalid email')}
        visible={error}
        onRequestClose={() => setError(false)}
        buttonLeft={() => (
          <ShadowButton content="ok" event={() => setError(false)} />
        )}
      />
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <GameCard
            title={t('Game') + item}
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
        content={t('Play')}
        active={true}
        onClick={() => navigate('GameMode')}
      />
    </Wrapper>
  );
};

export default Home;
