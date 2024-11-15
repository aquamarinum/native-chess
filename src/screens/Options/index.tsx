import React from 'react';
import {ScrollView} from 'react-native';
import MenuItem from '../../components/MenuItem';
import {
  amethist_league_icon,
  board_icon,
  bronze_league_icon,
  emerald_league_icon,
  eye_icon_light,
  eye_icon_dark,
  gold_league_icon,
  ruby_league_icon,
  saphire_league_icon,
  silver_league_icon,
  user_icon_dark,
  user_icon_light,
} from '../../assets/img';
import {createStyles} from './styles';
import {navigate} from '../../services/navigator/Navigator';
import Auth from '../../services/firebase/Auth';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {setLanguage, toggleTheme} from '../../redux/theme/slice';
import {themeSelector} from '../../redux/theme/selectors';

const Options = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(themeSelector);
  const styles = createStyles(isDarkMode);

  const changeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ru');
      dispatch(setLanguage('ru'));
    } else {
      i18n.changeLanguage('en');
      dispatch(setLanguage('en'));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <MenuItem image={gold_league_icon} onPress={() => navigate('Rating')}>
        {t('Rating')}
      </MenuItem>
      <MenuItem
        image={isDarkMode ? user_icon_light : user_icon_dark}
        onPress={() => navigate('Profile')}>
        {t('Profile')}
      </MenuItem>
      <MenuItem
        image={isDarkMode ? eye_icon_light : eye_icon_dark}
        onPress={changeLanguage}>
        {t('Language')}
      </MenuItem>
      <MenuItem image={board_icon} onPress={() => dispatch(toggleTheme())}>
        {t('Theme')}
      </MenuItem>
      <MenuItem image={bronze_league_icon} onPress={() => {}}>
        Menu #1
      </MenuItem>
      <MenuItem image={silver_league_icon} onPress={() => {}}>
        Menu #2
      </MenuItem>
      <MenuItem image={gold_league_icon} onPress={() => {}}>
        Menu #3
      </MenuItem>
      <MenuItem image={saphire_league_icon} onPress={() => {}}>
        Menu #4
      </MenuItem>
      <MenuItem image={ruby_league_icon} onPress={() => {}}>
        Menu #5
      </MenuItem>
      <MenuItem image={amethist_league_icon} onPress={() => {}}>
        Menu #6
      </MenuItem>
      <MenuItem image={emerald_league_icon} onPress={() => Auth.signOut()}>
        {t('Logout')}
      </MenuItem>
    </ScrollView>
  );
};

export default Options;
