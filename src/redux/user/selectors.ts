import {RootState} from '../store';

export const userSelector = (state: RootState) => state.user;
export const userNameSelector = (state: RootState) => state.user.name;
export const userRatingSelector = (state: RootState) => state.user.elo;
