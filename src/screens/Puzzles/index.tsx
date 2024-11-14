import React from 'react';
import Wrapper from '../../components/Wrapper';
import Title from '../../components/Title';
import {useTranslation} from 'react-i18next';

const Puzzles = () => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <Title>{t('Puzzles')}</Title>
    </Wrapper>
  );
};

export default Puzzles;
