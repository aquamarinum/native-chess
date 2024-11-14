import React, {ReactNode} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';

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
  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={isActive ? [styles.item, styles.itemActive] : [styles.item]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RadioListItem;
