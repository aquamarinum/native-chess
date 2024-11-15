import React from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import {indev_dark} from '../../assets/img';
import {createStyles} from './styles';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

const InDev = () => {
  const {t} = useTranslation();
  const isDarkMode = useAppSelector(themeSelector);
  const styles = createStyles(isDarkMode);
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
