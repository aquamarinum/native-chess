import React, {ReactNode} from 'react';
import {ScrollView, View} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type RadioListProps = {
  children: ReactNode[];
};

const RadioList: React.FC<RadioListProps> = ({children}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return <View style={styles.list}>{children}</View>;
};

export default RadioList;
