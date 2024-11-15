import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/User';

const initialState: User = {
  uid: '',
  email: '',
  password: '',
  username: '',
  name: '',
  elo: 0,
  registrated: '',
  lastLogin: '',
  country: '',
  bio: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      console.log('[4] SETTING TO REDUX ', action.payload);
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.elo = action.payload.elo;
      state.bio = action.payload.bio;
      state.country = action.payload.country;

      state.lastLogin = action.payload.lastLogin;
      state.password = action.payload.password;
      state.registrated = action.payload.registrated;
      state.uid = action.payload.uid;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    //? BCAUSE SOME STRING IN DB NOT WORKING
    setBio(state, action: PayloadAction<string>) {
      state.bio = action.payload;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setLastLogin(state, action: PayloadAction<string>) {
      state.lastLogin = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setUID(state, action: PayloadAction<string>) {
      state.uid = action.payload;
    },
    setRegistrated(state, action: PayloadAction<string>) {
      state.registrated = action.payload;
    },
    //? ----------------
    setElo(state, action: PayloadAction<number>) {
      state.elo = action.payload;
    },
    setCredentials(
      state,
      action: PayloadAction<{email: string; password: string}>,
    ) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const {
  setUser,
  setName,
  setElo,
  setCredentials,
  setUsername,
  setUID,
  setCountry,
  setBio,
  setEmail,
  setLastLogin,
  setRegistrated,
} = userSlice.actions;

export default userSlice.reducer;
