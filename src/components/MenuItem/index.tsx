import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableHighlight,
  View,
} from 'react-native';
import Title from '../Title';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type MenuItemProps = {
  children: string;
  image: ImageSourcePropType | undefined;
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({children, image, onPress}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Title>{children}</Title>
      </View>
    </TouchableHighlight>
  );
};

export default MenuItem;
