import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const ColorTransition = () => {
  const backgroundColor = useSharedValue('rgba(255, 255, 255, 1)'); // Начальный цвет

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  // Функция для автоматического изменения цвета
  const startColorAnimation = () => {
    setInterval(() => {
      backgroundColor.value = withTiming(
        backgroundColor.value === 'rgba(255, 255, 255, 1)'
          ? 'rgba(52, 152, 219, 1)'
          : 'rgba(255, 255, 255, 1)',
        {
          duration: 500,
          easing: Easing.linear,
        },
      );
    }, 2000); // Изменение цвета каждые 2 секунды
  };

  useEffect(() => {
    startColorAnimation();
    // Очистка интервала при размонтировании компонента
    return () => clearInterval(startColorAnimation);
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Вы можете добавить другие элементы сюда, если нужно */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ColorTransition;
