import React from 'react';
import {Image, Text, View} from 'react-native';
import Timer from '../Timer';
import {styles} from './styles';

const PlayerTab = () => {
  return (
    <View style={styles.container}>
      <View style={styles.photo}>
        <Image source={undefined} />
      </View>
      <View style={styles.content}>
        <Text style={styles.content_header}>Username#123</Text>
        <Text style={styles.content_text}>1560</Text>
      </View>
      <Timer />
    </View>
  );
};

export default PlayerTab;
