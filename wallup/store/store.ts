import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { catSlice, currentViewedSlice, postSlice } from './slices'
// ...
const store = configureStore({
  reducer: {
    currentItem: currentViewedSlice.reducer,
    posts: postSlice.reducer,
    categories: catSlice.reducer,
    // two: twoSlice.reducer,
  },
})
export type RootStateStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 

export default store

