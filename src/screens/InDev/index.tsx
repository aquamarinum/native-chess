import React from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import {indev_dark} from '../../assets/img';
import {styles} from './styles';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';

const InDev = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={indev_dark} style={styles.background}>
        <View style={styles.content}>
          <Title>Section in DEV</Title>
          <Subtitle>
            Section will be ready soon... I am currently working on it.
          </Subtitle>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default InDev;
