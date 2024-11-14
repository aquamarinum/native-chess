import React, {ReactNode} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';

type RadioListProps = {
  children: ReactNode[];
};

const RadioList: React.FC<RadioListProps> = ({children}) => {
  return <View style={styles.list}>{children}</View>;
};

export default RadioList;
