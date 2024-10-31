import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {ScrollView, View} from 'react-native';
import Switcher from '../../components/Switcher';
import SwitchItem from '../../components/SwitchItem';
import MainButton from '../../components/MainButton';
import {styles} from './styles';
import Header from '../../components/Header';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {setElo} from '../../redux/user/slice';
import {SignStatuses} from '../../services/validation/SignStatuses';
import {userSelector} from '../../redux/user/selectors';
import Firestore from '../../services/firebase/Firestore';
import Auth from '../../services/firebase/Auth';
import Popup from '../../components/Popup';
import ShadowButton from '../../components/ShadowButton';
import {navigate} from '../../services/navigator/Navigator';
import Splash from '../Splash';

const items = ['Noobie', 'Beginner', 'Average', 'Expert', 'Pro'];

const IntroLevel = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SignStatuses>(SignStatuses.SUCCESS);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const onSubmit = () => {
    //dispatch(setElo(200 + activeItem * 400));
    setLoading(true);
    Auth.signUp({...user, elo: 200 + activeItem * 400})
      .then(respStatus => setError(respStatus))
      .finally(() => setLoading(false));
  };

  if (loading) return <Splash />;

  if (error !== SignStatuses.SUCCESS) {
    setError(SignStatuses.SUCCESS);
    setModalVisible(true);
  }

  return (
    <Wrapper>
      <Popup
        header="Error"
        text="Cannot create user. Maybe user with this credentials exists. Check your data and then try again"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          navigate('SignUp');
        }}
        buttonLeft={() => (
          <ShadowButton
            content="Ok"
            event={() => {
              setModalVisible(false);
              navigate('SignUp');
            }}
          />
        )}
      />
      <View style={styles.container}>
        <View style={styles.form}>
          <Header>Choose your level</Header>
          <ScrollView style={styles.list}>
            {items.map((item, idx) => (
              <SwitchItem
                id={idx}
                isActive={activeItem === idx}
                mode="text"
                setActive={setActiveItem}>
                {item}
              </SwitchItem>
            ))}
            <MainButton
              active
              content="Create account"
              onClick={() => onSubmit()}
            />
          </ScrollView>
        </View>
      </View>
    </Wrapper>
  );
};

export default IntroLevel;
