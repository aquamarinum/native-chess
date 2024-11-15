import React from 'react';
import {Text} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type Props = {
  children: string;
};

const Subtitle: React.FC<Props> = ({children}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return <Text style={styles.subtitle}>{children}</Text>;
};

export default Subtitle;
