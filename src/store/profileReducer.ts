import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProfileAPI from "../utils/profile/apis";
import { PURGE } from "redux-persist";

// 프로필 정보 인터페이스
export interface IProfile {
  id: string;
  nickname: string;
  description: string;
  image?: string;
  created_at: number; // timestamp
  updated_at: number; // timestamp
}

// 프로필 상태 인터페이스
export interface IProfileState {
  status: "loading" | "loaded" | "error";
  state: IProfile | undefined;
}

// 프로필 상태 초기값
const initialState: IProfileState = {
  status: "loading",
  state: undefined,
};

// 프로필 정보를 가져오는 비동기 작업을 수행하는 thunk
export const getProfileInfo = createAsyncThunk(
  "GET_PROFILE_INFO",
  async (uid: string, thunkAPI) => {
    return ProfileAPI.get(uid);
  }
);

// 프로필 정보를 업데이트하는 비동기 작업을 수행하는 thunk
export const updateProfileInfo = createAsyncThunk(
  "UPDATE_PROFILE_INFO",
  async (args: { uid: string; data: IProfile }, thunkAPI) => {
    return ProfileAPI.update(args.uid, args.data);
  }
);

// 회원 탈퇴 thunk
export const deleteAccount = createAsyncThunk(
  "DELETE_ACCOUNT",
  async (args: { uid: string; tripIDs: string[] }, thunkAPI) => {
    return ProfileAPI.deleteAccount(args.uid, args.tripIDs);
  }
);

// 프로필 상태 slice
export const profileSlice = createSlice({
  name: "profileInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileInfo.fulfilled, (state, action) => {
      return {
        status: "loaded",
        state: action.payload,
      };
    });

    builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
      state.status = "loaded";
      state.state = action.payload;
    });

    // 초기화하고싶은 상태가 있는 slice마다 아래를 추가
    builder.addCase(PURGE, () => initialState);
  },
});
