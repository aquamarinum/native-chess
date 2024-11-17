import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../../redux/store';
import {themeSelector} from '../../../redux/theme/selectors';
import {queen_white_icon} from '../../../assets/img/chess';
import Subtitle from '../../../components/Subtitle';

type RatingPlayerProps = {
  name: string;
  elo: number;
  image: ImageSourcePropType | undefined;
  onClick: () => void;
};

const RatingPlayer: React.FC<RatingPlayerProps> = ({
  name,
  elo,
  image,
  onClick,
}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.listItem}>
        <View style={styles.imageContainer}>
          <Image source={queen_white_icon} style={styles.image} />
        </View>
        <Subtitle>{name}</Subtitle>
        <Subtitle>{elo.toString()}</Subtitle>
      </View>
    </TouchableOpacity>
  );
};

export default RatingPlayer;
