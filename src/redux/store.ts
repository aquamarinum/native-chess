import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, useStore} from 'react-redux';
import user from './user/slice';
import gameMode from './game/slice';
import theme from './theme/slice';

export const store = configureStore({
  reducer: {
    user,
    gameMode,
    theme,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
