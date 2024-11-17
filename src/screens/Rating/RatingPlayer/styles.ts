import {StyleSheet} from 'react-native';
import {darkTheme, lightTheme} from '../../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    listItem: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 4,
      borderRadius: 5,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_dark,
    },
    imageContainer: {
      padding: 5,
    },
    image: {
      width: 30,
      height: 30,
    },
    skeletonImage: {
      width: 40,
      height: 40,
      backgroundColor: '#d9d9d9',
      borderRadius: 5,
      overflow: 'hidden',
      position: 'relative',
    },
    animatedSkeletonImage: {
      width: '100%',
      height: '100%',
      backgroundColor: '#eaeaea',
      position: 'absolute',
      left: 0,
    },
    skeletonText: {
      width: '50%',
      height: 30,
      backgroundColor: '#d9d9d9',
      borderRadius: 5,
      overflow: 'hidden',
      position: 'relative',
    },
    animatedSkeletonText: {
      width: '100%',
      height: '100%',
      backgroundColor: '#eaeaea',
      position: 'absolute',
      left: 0,
    },
    skeletonElo: {
      width: 60,
      height: 30,
      backgroundColor: '#d9d9d9',
      borderRadius: 5,
      overflow: 'hidden',
      position: 'relative',
    },
    animatedSkeletonElo: {
      width: '100%',
      height: '100%',
      backgroundColor: '#eaeaea',
      position: 'absolute',
      left: 0,
    },
  });
