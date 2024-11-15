import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import {createStyles} from './styles';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type ShadowButtonProps = {
  content: string;
  event: () => void;
};

const ShadowButton: React.FC<ShadowButtonProps> = ({content, event}) => {
  const {t} = useTranslation();
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <TouchableHighlight style={styles.button} onPress={event}>
      <Text style={styles.text}>{t(content)}</Text>
    </TouchableHighlight>
  );
};

export default ShadowButton;
