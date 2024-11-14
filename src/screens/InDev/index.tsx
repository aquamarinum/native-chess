import React from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import {indev_dark} from '../../assets/img';
import {styles} from './styles';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import {useTranslation} from 'react-i18next';

const InDev = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={indev_dark} style={styles.background}>
        <View style={styles.content}>
          <Title>{t('Section in dev')}</Title>
          <Subtitle>{t('Will be ready soon')}</Subtitle>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default InDev;
