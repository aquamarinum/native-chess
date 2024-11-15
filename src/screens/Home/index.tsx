import React, {useEffect, useState} from 'react';
import MainButton from '../../components/MainButton';
import {useTranslation} from 'react-i18next';
import Wrapper from '../../components/Wrapper';
import {Alert, FlatList} from 'react-native';
import {styles} from './styles';
import GameCard from '../../components/GameCard';
import {navigate} from '../../services/navigator/Navigator';

const Home = () => {
  const {t} = useTranslation();

  return (
    <Wrapper>
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
