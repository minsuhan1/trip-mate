import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../utils/profile/getProfile";

// 프로필 정보 타입
export interface ProfileInfo {
  id: string;
  nickname: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

// 프로필 상태 타입
export interface Profile {
  status: "loading" | "loaded" | "error";
  state: ProfileInfo | undefined;
}

const initialState: Profile = {
  status: "loading",
  state: undefined,
};

export const getProfileInfo = createAsyncThunk(
  "GET_PROFILE_INFO",
  async (uid: string, thunkAPI) => {
    return getProfile(uid);
  }
);

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
  },
});
