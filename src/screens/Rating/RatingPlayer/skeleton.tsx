import React from 'react';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {createStyles} from './styles';
import {useAppSelector} from '../../../redux/store';
import {themeSelector} from '../../../redux/theme/selectors';
import {StyleSheet, View} from 'react-native';

const RatingPlayerSkeleton = () => {
  const styles = createStyles(useAppSelector(themeSelector));

  const translateX = useSharedValue(-500);
  translateX.value = withRepeat(
    withTiming(200, {
      duration: 1500,
      easing: Easing.linear,
    }),
    Infinity,
    false,
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <View style={styles.listItem}>
      <View style={styles.skeletonImage}>
        <Animated.View style={[styles.animatedSkeletonImage, animatedStyle]} />
      </View>
      <View style={styles.skeletonText}>
        <Animated.View style={[styles.animatedSkeletonText, animatedStyle]} />
      </View>
      <View style={styles.skeletonElo}>
        <Animated.View style={[styles.animatedSkeletonElo, animatedStyle]} />
      </View>
    </View>
  );
};

export default RatingPlayerSkeleton;
