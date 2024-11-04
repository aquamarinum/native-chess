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
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {setUser} from '../../redux/user/slice';
import Splash from '../Splash';
import {useAuth} from '../../hooks/useAuth';
import {userSelector} from '../../redux/user/selectors';

const Home = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  if (!user) Alert.alert('FAIL', 'failde to load user');

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
            onClick={() => navigate('GameScreen')}
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
