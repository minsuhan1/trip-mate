import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./profileReducer";

export const store = configureStore({
  reducer: {
    profileReducer: profileSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
