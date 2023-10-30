import { PURGE } from "redux-persist";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChecklistAPI from "../utils/checklist/apis";

// 체크리스트 item 인터페이스
export interface IChecklistItem {
  [key: string]: any;
  id: number; // timestamp
  title: string;
  done: boolean;
  created_at: number;
}

// 체크리스트 상태 인터페이스
export interface IChecklistState {
  status: "loading" | "loaded" | "error";
  tripId: string | undefined;
  state: IChecklistItem[] | undefined;
}

// 체크리스트 초기값
const initialState: IChecklistState = {
  status: "loading",
  tripId: undefined,
  state: undefined,
};

// 체크리스트를 가져오는 비동기 작업을 수행하는 thunk
export const getChecklist = createAsyncThunk(
  "GET_CHECKLIST",
  async (args: { uid: string; tripId: string }, thunkAPI) => {
    const data = await ChecklistAPI.get(args.uid, args.tripId);

    return { data, tripId: args.tripId };
  }
);

// 체크리스트를 업데이트하는 비동기 작업을 수행하는 thunk
export const setChecklist = createAsyncThunk(
  "SET_CHECKLIST",
  async (
    args: { uid: string; tripId: string; data: IChecklistItem[] },
    thunkAPI
  ) => {
    return ChecklistAPI.set(args.uid, args.data, args.tripId);
  }
);

// 체크리스트 slice
export const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChecklist.fulfilled, (state, action) => {
      state.status = "loaded";
      state.state = action.payload.data;
    });

    builder.addCase(setChecklist.fulfilled, (state, action) => {
      state.state = action.payload;
    });

    // 초기화하고싶은 상태가 있는 slice마다 아래를 추가
    builder.addCase(PURGE, () => initialState);
  },
});
