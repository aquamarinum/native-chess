import React, {useEffect, useState} from 'react';
import MainButton from '../../components/MainButton';
import {useTranslation} from 'react-i18next';
import Wrapper from '../../components/Wrapper';
import {Alert, FlatList} from 'react-native';
import {styles} from './styles';
import GameCard from '../../components/GameCard';
import {navigate} from '../../services/navigator/Navigator';
import {useAppSelector} from '../../redux/store';
import {userSelector} from '../../redux/user/selectors';

const Home = () => {
  const {t} = useTranslation();
  const user = useAppSelector(userSelector);
  console.log('[!!!] HOME ', user);

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
