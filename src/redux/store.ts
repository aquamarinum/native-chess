import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, useStore} from 'react-redux';
import user from './user/slice';

export const store = configureStore({
  reducer: {
    user,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
