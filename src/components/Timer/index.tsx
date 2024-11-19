import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

type TimerProps = {
  limit: number;
  isActive: boolean;
};

const Timer: React.FC<TimerProps> = ({limit, isActive}) => {
  const [seconds, setSeconds] = useState(limit * 60);

  useEffect(() => {
    if (isActive && seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [seconds, isActive]);

  const transformTimeForm = () => {
    const min = Math.trunc(seconds / 60);
    const sec = seconds % 60;

    const left = min < 10 ? '0' + min : min.toString();
    const right = sec < 10 ? '0' + sec : sec.toString();

    return left + ':' + right;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{transformTimeForm()}</Text>
    </View>
  );
};

export default Timer;
