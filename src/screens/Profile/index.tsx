import React from 'react';
import Wrapper from '../../components/Wrapper';
import {ScrollView} from 'react-native';
import ProfileBio from '../../widgets/ProfileBio';
import GameArchive from '../../widgets/GameArchive';

const Profile = () => {
  return (
    <Wrapper>
      <ScrollView>
        <ProfileBio />
        <GameArchive />
      </ScrollView>
    </Wrapper>
  );
};

export default Profile;
