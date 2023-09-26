import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProfileAPI from "../utils/profile/apis";

// 프로필 정보 타입
export interface ProfileInfo {
  id: string;
  nickname: string;
  image?: string;
  created_at: number; // timestamp
  updated_at: number; // timestamp
}

// 프로필 상태 타입
export interface Profile {
  status: "loading" | "loaded" | "error";
  state: ProfileInfo | undefined;
}

// 프로필 상태 초기값
const initialState: Profile = {
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
  async (args: { uid: string; data: ProfileInfo }, thunkAPI) => {
    return ProfileAPI.update(args.uid, args.data);
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
  },
});
