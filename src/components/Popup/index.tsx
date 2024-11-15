import React, {ReactNode} from 'react';
import {Text, View, Modal} from 'react-native';
import Subtitle from '../Subtitle';
import {createStyles} from './styles';
import Title from '../Title';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type PopupProps = {
  header: string;
  text: string;
  visible: boolean;
  onRequestClose: () => void;
  buttonLeft?: (() => ReactNode) | undefined;
  buttonRight?: (() => ReactNode) | undefined;
};

const Popup: React.FC<PopupProps> = ({
  header,
  text,
  visible,
  onRequestClose,
  buttonLeft = undefined,
  buttonRight = undefined,
}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.content}>
            <Title>{header}</Title>
            <Subtitle>{text}</Subtitle>
          </View>
          <View style={styles.buttons}>
            {buttonLeft && buttonLeft()}
            {buttonRight && buttonRight()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
