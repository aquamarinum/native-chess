import React from 'react';
import {Image, Text, View} from 'react-native';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import ShadowButton from '../../components/ShadowButton';
import MainButton from '../../components/MainButton';
import {styles} from './styles';
import Title from '../../components/Title';
import Switcher from '../../components/Switcher';
import Wrapper from '../../components/Wrapper';
import {ScrollView} from 'react-native-gesture-handler';
import {board_icon} from '../../assets/img';
import {navigate} from '../../services/navigator/Navigator';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {gameModeSelector} from '../../redux/game/selectors';
import {
  setIsRating,
  setLeftRating,
  setPieceColor,
  setRightRating,
} from '../../redux/game/slice';
import RadioList from '../../components/RadioList';
import RadioListItem from '../../components/RadioList/RadioListItem';
import {knight_black_icon, knight_white_icon} from '../../assets/img/chess';
import {userRatingSelector} from '../../redux/user/selectors';

const GameMode = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const gameMode = useAppSelector(gameModeSelector);
  const userRating = useAppSelector(userRatingSelector);

  const changeRatingGrade = (rating: number) => {
    if (rating < 500) return rating + 100;
    return 100;
  };

  return (
    <Wrapper>
      <ScrollView>
        <View style={styles.preview}>
          <Image source={board_icon} style={styles.image} />
        </View>
        <Header>{t('Options')}</Header>
        <View>
          <View style={styles.setting}>
            <ShadowButton
              content={gameMode.timeMode}
              event={() => navigate('TimeMode')}
            />
          </View>
          <View style={styles.setting}>
            <Title>{t('color')}</Title>
            <RadioList>
              <RadioListItem
                isActive={gameMode.pieceColor === 'white'}
                onSelect={() => dispatch(setPieceColor('white'))}>
                <Image
                  source={knight_white_icon}
                  style={{width: 20, height: 20}}
                />
              </RadioListItem>
              <RadioListItem
                isActive={gameMode.pieceColor === 'random'}
                onSelect={() => dispatch(setPieceColor('random'))}>
                <Text>R</Text>
              </RadioListItem>
              <RadioListItem
                isActive={gameMode.pieceColor === 'black'}
                onSelect={() => dispatch(setPieceColor('black'))}>
                <Image
                  source={knight_black_icon}
                  style={{width: 20, height: 20}}
                />
              </RadioListItem>
            </RadioList>
          </View>
          <View style={styles.setting}>
            <Title>{t('Rating')}</Title>
            <ShadowButton
              content={gameMode.isRating ? t('Yes') : t('No')}
              event={() => dispatch(setIsRating(!gameMode.isRating))}
            />
          </View>
          <View style={styles.setting}>
            <ShadowButton
              content={'-' + gameMode.leftRating}
              event={() =>
                dispatch(setLeftRating(changeRatingGrade(gameMode.leftRating)))
              }
            />
            <Title>{userRating.toString()}</Title>
            <ShadowButton
              content={'+' + gameMode.rightRating}
              event={() =>
                dispatch(
                  setRightRating(changeRatingGrade(gameMode.rightRating)),
                )
              }
            />
          </View>
        </View>
      </ScrollView>
      <MainButton
        active
        content={t('Play')}
        onClick={() => navigate('GameScreen')}
      />
    </Wrapper>
  );
};

export default GameMode;
