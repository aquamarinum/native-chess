import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: true,
  language: 'en',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<typeof initialState>) {
      state.isDarkMode = action.payload.isDarkMode;
      state.language = action.payload.language;
    },
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload === 'en' ? 'ru' : 'en';
    },
  },
});

export const {toggleTheme, setLanguage, setDarkMode, setConfig} =
  themeSlice.actions;

export default themeSlice.reducer;
