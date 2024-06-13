import { HomeItemProps } from '@/components/post'
import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentViewedState {
  value: {
    image?: any,
    uri?: string,
    username: string,
  }
}

const initialState: CurrentViewedState = {
  value: {
    image: undefined,
    uri: '',
    username: '',
  },
}

export const currentViewedSlice = createSlice({
  name: 'currentItem',
  initialState: initialState,
  reducers: {
    update: (state,{payload}) => {
        // console.log({...state.value,...payload});
        
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = {...state.value,...payload}
    },
    selectIndex: (state,{payload})=>{

    }
  },
})

// Action creators are generated for each case reducer function
export const { update: updateCurrentItem } = currentViewedSlice.actions;




type Posts = {
  [k:string]: {
    data: ({image?: any; uri?: string; id?: string})[];
    username: string;
    image?: any; uri?: string;
    userLink?: string;
    
  }
}
const postInit: {value: Posts} = {value: {}};

export const postSlice = createSlice({
  name: 'posts',
  initialState: postInit,
  reducers: {
    addPost: (state,{payload}:{payload: Posts}) => {
        // console.log({...state.value,...payload});
        
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value = {...state.value,...payload}

      state.value = {
        ...state.value,
        ...payload
      }
    },
  },
})

export const { addPost } = postSlice.actions;



type Categoryies = {
  [k: string]: {
      image: any;
  }[];
}

const catInit: {value: Categoryies} = {value: {}};

export const catSlice = createSlice({
  name: 'categories',
  initialState: catInit,
  reducers: {
    addItems: (state,{payload}:{payload: {name: string; items: Categoryies['']}}) => {
        // console.log({...state.value,...payload});
        
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value = {...state.value,...payload}
      if(!state.value[payload.name]){
        state.value = {
          ...state.value,
          [payload.name]: payload.items
        }
      }
      else{
        state.value = {
          ...state.value,
          [payload.name]: [...state.value[payload.name],...payload.items]
        }
      }
      
    },
  },
})

export const { addItems } = catSlice.actions;


