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
  rating: string;
  image: ImageSourcePropType | undefined;
  league_icon: ImageSourcePropType | undefined;
  onClick: () => void;
};

const GameCard: React.FC<GameCardProps> = ({
  title,
  subtitle,
  rating,
  image = undefined,
  league_icon = undefined,
  onClick,
}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.preview}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <View style={styles.rating}>
            <View>
              <Image source={league_icon} style={styles.rating_icon} />
            </View>
            <Text style={styles.rating_content}>{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;
