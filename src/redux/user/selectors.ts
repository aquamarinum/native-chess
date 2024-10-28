import {RootState} from '../store';

export const userSelector = (state: RootState) => state.user;
export const userNameSelector = (state: RootState) => state.user.name;
