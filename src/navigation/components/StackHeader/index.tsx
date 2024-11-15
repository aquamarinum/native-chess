import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../../redux/store';
import {themeSelector} from '../../../redux/theme/selectors';

type StackHeaderProps = {
  content: string;
  icon_url: ImageSourcePropType | undefined;
};

const StackHeader: React.FC<StackHeaderProps> = ({
  content,
  icon_url = undefined,
}) => {
  const isDarkMode = useAppSelector(themeSelector);
  const styles = createStyles(isDarkMode);
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={icon_url} />
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

export default StackHeader;
