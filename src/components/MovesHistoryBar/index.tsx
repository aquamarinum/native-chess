import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {createStyles} from './styles';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type MovesHistoryBarProps = {
  moves: Array<string>;
};

const MovesHistoryBar: React.FC<MovesHistoryBarProps> = ({moves}) => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <View style={{width: '100%'}}>
      <FlatList
        horizontal={true}
        style={styles.list}
        data={moves}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text
              style={[
                styles.text,
                Number(item[0]) % 2 === 0 ? styles.white : styles.black,
              ]}>
              {item}
            </Text>
          </View>
        )}
        keyExtractor={num => num.toString()}
      />
    </View>
  );
};

export default MovesHistoryBar;
