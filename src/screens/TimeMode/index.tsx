import React from 'react';
import Wrapper from '../../components/Wrapper';
import {ScrollView, View} from 'react-native';
import MainButton from '../../components/MainButton';
import {useTranslation} from 'react-i18next';
import Title from '../../components/Title';
import Switcher from '../../components/Switcher';
import {styles} from './styles';
import {goBack} from '../../services/navigator/Navigator';
import RadioList from '../../components/RadioList';
import RadioListItem from '../../components/RadioList/RadioListItem';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {setTimeMode} from '../../redux/game/slice';
import {TimeModes} from '../../types/TimeModes';
import {timeModeSelector} from '../../redux/game/selectors';

const bulletModes = [TimeModes.BULLET1, TimeModes.BULLET2, TimeModes.BULLET3];
const blitzModes = [TimeModes.BLITZ1, TimeModes.BLITZ2, TimeModes.BLITZ3];
const rapidModes = [TimeModes.RAPID1, TimeModes.RAPID2, TimeModes.RAPID3];
const correspondModes = [
  TimeModes.CORRESPOND1,
  TimeModes.CORRESPOND2,
  TimeModes.CORRESPOND3,
];

const TimeMode = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const timeMode = useAppSelector(timeModeSelector);
  return (
    <Wrapper>
      <ScrollView style={styles.content}>
        <View style={styles.list_item}>
          <Title>{t('Bullet')}</Title>
          <RadioList>
            {bulletModes.map(mode => (
              <RadioListItem
                isActive={mode === timeMode}
                onSelect={() => dispatch(setTimeMode(mode))}>
                <Title>{mode}</Title>
              </RadioListItem>
            ))}
          </RadioList>
        </View>
        <View style={styles.list_item}>
          <Title>{t('Blitz')}</Title>
          <RadioList>
            {blitzModes.map(mode => (
              <RadioListItem
                isActive={mode === timeMode}
                onSelect={() => dispatch(setTimeMode(mode))}>
                <Title>{mode}</Title>
              </RadioListItem>
            ))}
          </RadioList>
        </View>
        <View style={styles.list_item}>
          <Title>{t('Rapid')}</Title>
          <RadioList>
            {rapidModes.map(mode => (
              <RadioListItem
                isActive={mode === timeMode}
                onSelect={() => dispatch(setTimeMode(mode))}>
                <Title>{mode}</Title>
              </RadioListItem>
            ))}
          </RadioList>
        </View>
        <View style={styles.list_item}>
          <Title>{t('Correspond')}</Title>
          <RadioList>
            {correspondModes.map(mode => (
              <RadioListItem
                isActive={mode === timeMode}
                onSelect={() => dispatch(setTimeMode(mode))}>
                <Title>{mode}</Title>
              </RadioListItem>
            ))}
          </RadioList>
        </View>
      </ScrollView>
      <MainButton content={t('Next')} active onClick={() => goBack()} />
    </Wrapper>
  );
};

export default TimeMode;
