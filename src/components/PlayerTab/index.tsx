import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import Timer from '../Timer';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type PlayerTabProps = {
  username: string;
  elo: number | undefined;
  image: ImageSourcePropType | undefined;
  timeLimit: number;
  timerStatus: boolean;
};

const PlayerTab: React.FC<PlayerTabProps> = ({
  username,
  elo,
  image,
  timeLimit,
  timerStatus,
}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <View style={styles.container}>
      <View>
        <Image source={image} style={styles.photo} />
      </View>
      <View style={styles.content}>
        <Text style={styles.content_header}>{username}</Text>
        <Text style={styles.content_text}>{elo ? elo : '-'}</Text>
      </View>
      <Timer limit={timeLimit} isActive={timerStatus} />
    </View>
  );
};

export default PlayerTab;
