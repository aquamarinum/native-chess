import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStyles} from './styles';
import Title from '../Title';
import Subtitle from '../Subtitle';
import {king_black_icon} from '../../assets/img/chess';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type GameCardProps = {
  title: string;
  subtitle: string;
  league: string;
  image: ImageSourcePropType | undefined;
  league_icon: ImageSourcePropType | undefined;
  onClick: () => void;
};

const GameCard: React.FC<GameCardProps> = ({
  title,
  subtitle,
  league,
  image = undefined,
  league_icon = undefined,
  onClick,
}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onClick}>
      <View style={styles.preview}>
        <Image source={king_black_icon} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <View style={styles.rating}>
          <View style={styles.rating_icon}>
            <Image source={league_icon} />
          </View>
          <Text style={styles.rating_content}>{league}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;
