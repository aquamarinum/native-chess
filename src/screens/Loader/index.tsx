import React from 'react';
import {View} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

const Loader = () => {
  const rotation = useSharedValue(0);
  const styles = createStyles(useAppSelector(themeSelector));

  rotation.value = withRepeat(
    withTiming(1, {
      duration: 1000,
      easing: Easing.linear,
    }),
    Infinity,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value * 2 * Math.PI}rad`}],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, animatedStyle]} />
    </View>
  );
};

export default Loader;
