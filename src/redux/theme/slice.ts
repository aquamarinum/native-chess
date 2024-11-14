import {createSlice} from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: true,
  },
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;
