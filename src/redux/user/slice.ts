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
      state = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
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

export const {setUser, setUsername, setElo, setCredentials} = userSlice.actions;

export default userSlice.reducer;
