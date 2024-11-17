import React from 'react';
import Wrapper from '../../components/Wrapper';
import Title from '../../components/Title';
import {useTranslation} from 'react-i18next';
import Loader from '../Loader';

const Puzzles = () => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <Title>{t('Puzzles')}</Title>
      <Loader />
    </Wrapper>
  );
};

export default Puzzles;
