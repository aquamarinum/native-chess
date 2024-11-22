import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import Firestore from '../../services/firebase/Firestore';
import {FetchStatus} from '../../types/FetchStatus';
import Wrapper from '../../components/Wrapper';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';
import RatingPlayer from './RatingPlayer';
import Title from '../../components/Title';
import {useTranslation} from 'react-i18next';
import {
  bronze_league_icon,
  emerald_league_icon,
  gold_league_icon,
  ruby_league_icon,
  silver_league_icon,
} from '../../assets/img';
import RatingPlayerSkeleton from './RatingPlayer/skeleton';
import ColorTransition from './RatingPlayer/Anim';

const user1 = {
  bio: '',
  country: '',
  elo: 0,
  email: 'admin@admin.com',
  lastLogin: '',
  name: 'Administrator',
  password: '111111',
  registrated: '',
  uid: '',
  username: '',
};

const user2 = {
  bio: '',
  country: '',
  elo: 1000,
  email: 'test@test.com',
  lastLogin: '',
  name: 'Tester',
  password: '111111',
  registrated: '',
  uid: '',
  username: '',
};

const Rating = () => {
  const [users, setUsers] = useState<(typeof user1)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {t} = useTranslation();

  const styles = createStyles(useAppSelector(themeSelector));

  useEffect(() => {
    setLoading(true);
    Firestore.getAllUsers()
      .then(res => {
        console.log(res);
        if (res !== FetchStatus.FAILED) {
          console.log(res);
          //@ts-ignore
          setUsers(res);
        } else {
          setUsers([user1, user2]);
        }
      })
      .catch(error => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <View style={styles.preview}>
        <Title>{t('Leagues')}</Title>
        <View style={styles.leagues}>
          <Image source={bronze_league_icon} style={styles.leagueImage} />
          <Image source={silver_league_icon} style={styles.leagueImage} />
          <Image source={gold_league_icon} style={styles.leagueImage} />
          <Image source={ruby_league_icon} style={styles.leagueImage} />
          <Image source={emerald_league_icon} style={styles.leagueImage} />
        </View>
        <Title>{t('Top players')}</Title>
      </View>
      {!loading ? (
        <FlatList
          style={styles.list}
          data={[...new Array(5)]}
          renderItem={({item}) => <RatingPlayerSkeleton />}
        />
      ) : (
        <FlatList
          style={styles.list}
          data={users}
          renderItem={({item}) => (
            <RatingPlayer
              name={item.name}
              elo={item.elo}
              image={undefined}
              onClick={() => {}}
            />
          )}
        />
      )}
    </Wrapper>
  );
};

export default Rating;
