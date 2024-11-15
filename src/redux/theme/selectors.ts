import {RootState} from '../store';

export const configSelector = (state: RootState) => state.theme;
export const themeSelector = (state: RootState) => state.theme.isDarkMode;
export const languageSelector = (state: RootState) => state.theme.language;
