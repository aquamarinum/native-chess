import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {Alert, ScrollView, View} from 'react-native';
import Header from '../../components/Header';
import Subtitle from '../../components/Subtitle';
import ShadowButton from '../../components/ShadowButton';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import Title from '../../components/Title';
import GameCardMini from '../../components/GameCardMini';
import {User} from '../../types/User';
import Firestore from '../../services/firebase/Firestore';
import Auth from '../../services/firebase/Auth';
import {FetchStatus} from '../../types/FetchStatus';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const {t} = useTranslation();
  const [user, setUser] = useState<User>({
    uid: '',
    email: '',
    username: '',
    name: '',
    bio: '',
    elo: 0,
    country: '',
    lastLogin: '',
    registrated: '',
  });
  useEffect(() => {
    const id = Auth.getUser()?.uid;
    if (id)
      Firestore.getUser(id)
        .then(res => {
          if (res !== FetchStatus.FAILED) {
            const data = res.data();
            if (data) {
              //@ts-ignore
              setUser(data);
            }
          }
        })
        .catch(err => Alert.alert('ERROR'));
  }, []);
  return (
    <Wrapper>
      <ScrollView>
        {/* BIO */}
        <View style={styles.container}>
          <View style={styles.photo}>{/* <Image /> */}</View>
          <Header>{user.name}</Header>
          <Subtitle>{user.bio}</Subtitle>
          <View style={styles.buttons}>
            <ShadowButton content={t('gameMenuFriend')} event={() => {}} />
          </View>
        </View>
        {/* Game Archive */}
        <View>
          <Title>{t('lastGames')}</Title>
          <GameCardMini />
          <GameCardMini />
          <GameCardMini />
          <ShadowButton content={t('showmore')} event={() => {}} />
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Profile;
