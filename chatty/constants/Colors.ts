// import { type ReactNode, createContext, useContext, useState, useMemo } from "react";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';



const Theme = {
  light: {
    colors:{
      primary: '#1534e7',
      white: '#FFFFFF',
      black: '#4d474a',
      divider: '#f3f3f3',
      text: '#242424',
      searchBar: '#f9f9f9',
      // fadedBlack: '#333333',
      neutral: '#EFF0F3',
      background: '#fff9f9',
      gray0: '#fff9f9',
      gray1: '#EFF0F3',
      danger: '#E23131'
    },

  },
  dark: {
    // Update these color values if you wish to support dark mode
    colors:{
      primary: '#1534e7',
      white: 'rgb(11, 11, 12)',
      black: 'rgb(185, 183, 184)',
      text: '#242424',
      searchBar: '#F2F2F2',
      // fadedBlack: '#333333',
      neutral: '#EFF0F3',
      background: '#000000',
      gray0: 'rgb(15, 15, 19)',
      gray1: 'rgb(72, 74, 74)',
      divider: '#3f3f3f',
      danger: '#E23131'
    },
  },
};



export default Theme;