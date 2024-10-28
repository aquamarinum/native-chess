import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function navigate(screen: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
}
