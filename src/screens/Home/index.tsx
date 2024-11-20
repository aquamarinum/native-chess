import React, {useEffect, useState} from 'react';
import MainButton from '../../components/MainButton';
import {useTranslation} from 'react-i18next';
import Wrapper from '../../components/Wrapper';
import {Alert, FlatList, ImageSourcePropType} from 'react-native';
import {styles} from './styles';
import GameCard from '../../components/GameCard';
import {navigate} from '../../services/navigator/Navigator';
import {
  bishop_black_icon,
  king_black_icon,
  knight_black_icon,
} from '../../assets/img/chess';
import {
  bronze_league_icon,
  gold_league_icon,
  silver_league_icon,
  trophy_icon_light,
} from '../../assets/img';
import {MovesAggregator} from '../../game/MovesAggregator';

type gameCardType = {
  title: string;
  description: string;
  rating: string;
  league_icon: ImageSourcePropType | undefined;
  image: ImageSourcePropType | undefined;
};

const cards: gameCardType[] = [
  {
    title: 'PVP online',
    description: 'Play via Internet',
    rating: 'unknown',
    image: king_black_icon,
    league_icon: trophy_icon_light,
  },
  {
    title: 'PVP offline',
    description: 'Play on one device',
    rating: 'unknown',
    image: bishop_black_icon,
    league_icon: trophy_icon_light,
  },
  {
    title: 'PVE-1',
    description: 'Play with AI easy',
    rating: '600',
    image: knight_black_icon,
    league_icon: bronze_league_icon,
  },
  {
    title: 'PVE-2',
    description: 'Play with AI medium',
    rating: '1200',
    image: knight_black_icon,
    league_icon: silver_league_icon,
  },
  {
    title: 'PVE-3',
    description: 'Play with AI hard',
    rating: '2000',
    image: knight_black_icon,
    league_icon: gold_league_icon,
  },
];

const Home = () => {
  const {t} = useTranslation();
  const converter = new MovesAggregator();
  const res = 'e2e4 c7c5 f2f4 d7d6 g1f3 b8c6 f1c4 g8f6 d2d3 g7g6 e1g1 f8g7 b1c3'
    .split(' ')
    .forEach(val => {
      console.log('[TEST] ', converter.convertToPos(val.substring(0, 2)));
      console.log('[TEST] ', converter.convertToPos(val.substring(2)));
    });

  return (
    <Wrapper>
      <FlatList
        data={cards}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <GameCard
            title={item.title}
            subtitle={item.description}
            rating={item.rating}
            onClick={() => navigate('GameConnect')}
            image={item.image}
            league_icon={item.league_icon}
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
