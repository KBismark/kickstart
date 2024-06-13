const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const theme = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#0046f9',
    text: '#fff',
    background: '#121212',
    white: '#0f0f0f',
    gray1: '#151515',
    gray2: '#0e0e0e',
    gray0: '#121212',
    divider: '#232323',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

const mode: 'dark'|'light' = 'dark'
export const useThemeColors = ()=>{
  return theme[mode];
}

export default theme;