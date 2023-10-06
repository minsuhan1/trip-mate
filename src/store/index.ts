import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./profileReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { triplistSlice } from "./triplistReducer";

// 리듀서 설정
const reducers = combineReducers({
  profileReducer: profileSlice.reducer,
  triplistReducer: triplistSlice.reducer,
});

// redux-persist를 통한 상태 로컬 저장 설정
const persistConfig = {
  key: "root",
  storage, // 로컬스토리지에 저장
  // whitelist: 지정된 reducer를 저장
  // blacklist: 지정된 reducer를 저장에서 제외
};

const persistedReducer = persistReducer(persistConfig, reducers);

// redux store 설정
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
