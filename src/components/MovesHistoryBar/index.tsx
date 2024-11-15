import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

const MovesHistoryBar = () => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <View style={{width: '100%'}}>
      <FlatList
        horizontal={true}
        style={styles.list}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text
              style={[
                styles.text,
                item % 2 === 0 ? styles.white : styles.black,
              ]}>
              {item + '. Rg6'}
            </Text>
          </View>
        )}
        keyExtractor={num => num.toString()}
      />
    </View>
  );
};

export default MovesHistoryBar;
