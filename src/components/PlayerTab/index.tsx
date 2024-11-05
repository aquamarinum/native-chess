import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import Timer from '../Timer';
import {styles} from './styles';

type PlayerTabProps = {
  username: string;
  elo: number;
  image: ImageSourcePropType | undefined;
};

const PlayerTab: React.FC<PlayerTabProps> = ({username, elo, image}) => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Image source={image} style={styles.photo} />
      </View>
      <View style={styles.content}>
        <Text style={styles.content_header}>{username}</Text>
        <Text style={styles.content_text}>{elo}</Text>
      </View>
      <Timer />
    </View>
  );
};

export default PlayerTab;
