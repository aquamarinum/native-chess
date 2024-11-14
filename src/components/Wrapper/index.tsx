import React, {ReactNode} from 'react';
import {
  Alert,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type Props = {
  children: ReactNode;
};

const Wrapper: React.FC<Props> = ({children}) => {
  const isDarkMode = useAppSelector(themeSelector);
  const styles = createStyles(isDarkMode);
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Wrapper;
