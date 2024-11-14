import React from 'react';
import {ScrollView} from 'react-native';
import MenuItem from '../../components/MenuItem';
import {
  amethist_league_icon,
  board_icon,
  bronze_league_icon,
  emerald_league_icon,
  eye_icon,
  gold_league_icon,
  ruby_league_icon,
  saphire_league_icon,
  silver_league_icon,
  user_icon,
} from '../../assets/img';
import {styles} from './styles';
import {navigate} from '../../services/navigator/Navigator';
import Auth from '../../services/firebase/Auth';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';
import {toggleTheme} from '../../redux/theme/slice';

const Options = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();

  const changeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ru');
    } else i18n.changeLanguage('en');
  };

  return (
    <ScrollView style={styles.container}>
      <MenuItem image={gold_league_icon} onPress={() => navigate('Rating')}>
        {t('Rating')}
      </MenuItem>
      <MenuItem image={user_icon} onPress={() => navigate('Profile')}>
        {t('Profile')}
      </MenuItem>
      <MenuItem image={eye_icon} onPress={changeLanguage}>
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
