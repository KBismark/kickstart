// import { type ReactNode, createContext, useContext, useState, useMemo } from "react";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';



const Theme = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    colors:{
      primary: '#3858AD',
      white: '#FFFFFF',
      black: '#000000',
      text: '#242424',
      searchBar: '#F2F2F2',
      fadedBlack: '#333333',
      neutral: '#EFF0F3',
      background: '#E2E2E2',
      danger: '#E23131'
    },

  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // Update these color values if you wish to support dark mode
    colors:{
      primary: '#3858AD',
      white: '#FFFFFF',
      black: '#000000',
      text: '#242424',
      searchBar: '#F2F2F2',
      fadedBlack: '#333333',
      neutral: '#EFF0F3',
      background: '#E2E2E2',
      danger: '#E23131'
    },
  },
};



export default Theme;