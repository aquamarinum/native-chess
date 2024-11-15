import React from 'react';
import {Text} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../../redux/store';
import {themeSelector} from '../../../redux/theme/selectors';

type TabTextProps = {
  content: string;
  focused: boolean;
};

const TabText: React.FC<TabTextProps> = ({content, focused = false}) => {
  const isDarkMode = useAppSelector(themeSelector);
  const styles = createStyles(isDarkMode);
  return (
    <Text style={focused ? [styles.text, styles.focused] : styles.text}>
      {content}
    </Text>
  );
};

export default TabText;
