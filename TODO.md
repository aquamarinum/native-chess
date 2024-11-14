const {t, i18n} = useTranslation();
const changeLanguage = () => {
if (i18n.language === 'en') {
i18n.changeLanguage('ru');
} else i18n.changeLanguage('en');
};

В React Native можно реализовать смену темы (например, светлая и тёмная темы) с помощью нескольких подходов. Один из самых популярных способов – использование библиотеки для управления состоянием (например, Context API или Redux) в сочетании с поддержкой тем от таких библиотек, как `styled-components` или `react-native-paper`.

Ниже приведён простой пример, в котором используется Context API для управления темой приложения.

### Пример реализации смены темы в React Native с помощью Context API

1. **Установите необходимые библиотеки.** Хотя это можно сделать и без дополнительных библиотек, `styled-components` упрощает управление темами:

   ```bash
   npm install styled-components
   ```

2. **Создайте файл для темы.** Например, `theme.js`:

   ```javascript
   // theme.js
   export const lightTheme = {
     background: '#ffffff',
     text: '#000000',
   };

   export const darkTheme = {
     background: '#000000',
     text: '#ffffff',
   };
   ```

3. **Создайте контекст для темы.** Этот контекст будет управлять текущей темой и предоставлять функцию для её переключения.

   ```javascript
   // ThemeContext.js
   import React, {createContext, useState, useContext} from 'react';
   import {lightTheme, darkTheme} from './theme';

   const ThemeContext = createContext();

   export const ThemeProvider = ({children}) => {
     const [theme, setTheme] = useState(lightTheme);

     const toggleTheme = () => {
       setTheme(prevTheme =>
         prevTheme === lightTheme ? darkTheme : lightTheme,
       );
     };

     return (
       <ThemeContext.Provider value={{theme, toggleTheme}}>
         {children}
       </ThemeContext.Provider>
     );
   };

   export const useTheme = () => useContext(ThemeContext);
   ```

4. **Оборачиваем приложение в `ThemeProvider`.** В корневом компоненте (например, `App.js`) оберните ваше приложение в провайдер темы.

   ```javascript
   // App.js
   import React from 'react';
   import {ThemeProvider} from './ThemeContext';
   import MainScreen from './MainScreen';

   export default function App() {
     return (
       <ThemeProvider>
         <MainScreen />
       </ThemeProvider>
     );
   }
   ```

5. **Используйте тему в компонентах.** Теперь вы можете получать текущую тему и функцию для её переключения в любом компоненте, используя хук `useTheme`.

   ```javascript
   // MainScreen.js
   import React from 'react';
   import {Text, View, Button, StyleSheet} from 'react-native';
   import {useTheme} from './ThemeContext';
   import styled from 'styled-components/native';

   const Container = styled.View`
     flex: 1;
     justify-content: center;
     align-items: center;
     background-color: ${props => props.theme.background};
   `;

   const ThemedText = styled.Text`
     color: ${props => props.theme.text};
     font-size: 20px;
   `;

   const MainScreen = () => {
     const {theme, toggleTheme} = useTheme();

     return (
       <Container theme={theme}>
         <ThemedText theme={theme}>
           Hello, this is a {theme === lightTheme ? 'Light' : 'Dark'} theme!
         </ThemedText>
         <Button title="Toggle Theme" onPress={toggleTheme} />
       </Container>
     );
   };

   export default MainScreen;
   ```

### Объяснение кода

- **Контекст темы (`ThemeContext.js`)** хранит текущее состояние темы (`lightTheme` или `darkTheme`) и предоставляет функцию `toggleTheme`, которая переключает тему.
- **Компоненты (`Container` и `ThemedText`)** используют `styled-components` для стилизации, с привязкой к текущей теме через `props.theme`.
- **Компонент `MainScreen`** отображает текст и кнопку для переключения темы, при этом цвет фона и текста изменяется в зависимости от текущей темы.

### Дополнительные советы

- **Поддержка системной темы:** Вы можете использовать `Appearance` API от React Native, чтобы учитывать системные настройки пользователя (тёмная/светлая тема). Импортируйте `Appearance` из `react-native`, затем слушайте изменения системной темы и обновляйте состояние темы, используя `Appearance.getColorScheme()`:

  ```javascript
  import {Appearance} from 'react-native';

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
  }, []);
  ```

- **Анимация при переключении темы:** Чтобы добавить плавный переход, можно использовать `react-native-reanimated` или `react-native-animated` для анимации изменения темы.
