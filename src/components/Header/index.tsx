import React, {PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type Props = {
  children: string;
};

const Header = ({children}: Props) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return <Text style={styles.header}>{children}</Text>;
};

export default Header;
