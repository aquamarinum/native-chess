import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {styles} from './styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {arrow_icon_dark, arrow_icon_light} from '../../../assets/img';
import {useAppSelector} from '../../../redux/store';
import {themeSelector} from '../../../redux/theme/selectors';

type StepBackProps = {
  onClick: () => void;
};

const StepBack: React.FC<StepBackProps> = ({onClick}) => {
  const isDarkMode = useAppSelector(themeSelector);
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <Image
          source={isDarkMode ? arrow_icon_light : arrow_icon_dark}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StepBack;
