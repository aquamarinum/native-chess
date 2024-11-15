import React, {ReactNode} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type RadioListItemProps = {
  children: ReactNode;
  isActive: boolean;
  onSelect: () => void;
};

const RadioListItem: React.FC<RadioListItemProps> = ({
  children,
  isActive,
  onSelect,
}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={isActive ? [styles.item, styles.itemActive] : [styles.item]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RadioListItem;
