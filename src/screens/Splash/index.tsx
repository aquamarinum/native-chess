import React from 'react';
import {Image, SafeAreaView} from 'react-native';
import {splash_icon_dark, splash_icon_light} from '../../assets/img';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

const Splash = () => {
  const isDarkMode = useAppSelector(themeSelector);
  const styles = createStyles(isDarkMode);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={isDarkMode ? splash_icon_dark : splash_icon_light}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

export default Splash;
