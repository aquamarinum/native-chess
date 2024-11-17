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
            onClick={() => navigate('Game')}
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
