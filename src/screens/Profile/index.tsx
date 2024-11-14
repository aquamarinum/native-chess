import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {Image, ScrollView, View} from 'react-native';
import Header from '../../components/Header';
import Subtitle from '../../components/Subtitle';
import ShadowButton from '../../components/ShadowButton';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import Title from '../../components/Title';
import GameCardMini from '../../components/GameCardMini';
import {useAppSelector} from '../../redux/store';
import {userSelector} from '../../redux/user/selectors';
import {king_black_icon, rook_black_icon} from '../../assets/img/chess';

const Profile = () => {
  const {t} = useTranslation();
  const user = useAppSelector(userSelector);
  console.log(user);

  return (
    <Wrapper>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <Image source={rook_black_icon} style={styles.photo} />
          </View>
          <Header>{user.name}</Header>
          <Subtitle>{user.email}</Subtitle>
        </View>
        <View>
          <Title>{t('Last games')}</Title>
          <GameCardMini />
          <GameCardMini />
          <GameCardMini />
          <ShadowButton content={t('Show more')} event={() => {}} />
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Profile;
