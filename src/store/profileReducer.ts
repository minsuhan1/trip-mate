import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../utils/profile/getProfile";
import { updateProfile } from "../utils/profile/updateProfile";

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

export const updateProfileInfo = createAsyncThunk(
  "UPDATE_PROFILE_INFO",
  async (args: { uid: string; data: ProfileInfo }, thunkAPI) => {
    return updateProfile(args.uid, args.data);
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

    builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
      state.status = "loaded";
      state.state = action.payload;
    });
  },
});
