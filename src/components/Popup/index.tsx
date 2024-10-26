import React, {ReactNode} from 'react';
import {Text, View, Modal} from 'react-native';
import Subtitle from '../Subtitle';
import ShadowButton from '../ShadowButton';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import Title from '../Title';

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
  const {t} = useTranslation();
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
