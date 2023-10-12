import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TripAPI from "../utils/trip/apis";
import { PURGE } from "redux-persist";

// 여행 데이터 인터페이스
export interface ITripData {
  [key: string]: any;
  title: string;
  user_id: string;
  image?: string;
  start_date: number;
  end_date: number;
  created_at: number; // timestamp
  updated_at: number; // timestamp
}
// 여행 인터페이스
export interface ITrip {
  id: string;
  data: ITripData;
}

// 여행 목록 인터페이스
// [{id: ..., data: ...}, ...]
export interface ITriplist extends Array<ITrip> {}

// 여행 일정 목록 상태 인터페이스
export interface ITriplistState {
  status: "loading" | "loaded" | "error";
  state: ITriplist | undefined;
}

// 여행 목록 상태 초기값
const initialState: ITriplistState = {
  status: "loading",
  state: undefined,
};

// 여행 목록을 가져오는 비동기 작업을 수행하는 thunk
export const getTriplist = createAsyncThunk(
  "GET_TRIPLIST",
  async (uid: string, thunkAPI) => {
    return TripAPI.get(uid);
  }
);

// 여행을 추가하는 비동기 작업을 수행하는 thunk
export const addTrip = createAsyncThunk(
  "CREATE_TRIP",
  async (args: { uid: string; data: ITripData }, thunkAPI) => {
    return TripAPI.add(args.uid, args.data);
  }
);

// 여행을 업데이트하는 비동기 작업을 수행하는 thunk
export const updateTrip = createAsyncThunk(
  "UPDATE_TRIP",
  async (
    args: { uid: string; data: { [key: string]: any }; id: string },
    thunkAPI
  ) => {
    return TripAPI.update(args.uid, args.id, args.data);
  }
);

// 여행을 삭제하는 비동기 작업을 수행하는 thunk
export const deleteTrip = createAsyncThunk(
  "DELETE_TRIP",
  async (args: { uid: string; id: string }, thunkAPI) => {
    return TripAPI.delete(args.uid, args.id);
  }
);

// 여행 목록 상태 slice
export const triplistSlice = createSlice({
  name: "triplist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTriplist.fulfilled, (state, action) => {
      state.status = "loaded";
      state.state = action.payload;
    });

    builder.addCase(addTrip.fulfilled, (state, action) => {
      // 생성된 id의 여행 데이터를 상태에 추가
      const { id, data } = action.payload;
      state.state?.push({ id, data });
    });

    builder.addCase(deleteTrip.fulfilled, (state, action) => {
      const deleted_id = action.payload;
      // 삭제한 id의 여행 데이터를 상태에서 제거
      state.state = state.state?.filter((trip) => trip.id !== deleted_id);
    });

    builder.addCase(updateTrip.fulfilled, (state, action) => {
      // 수정한 여행 id, 수정 내용
      const { id, data } = action.payload;
      // 수정된 내용을 상태에 반영
      state.state?.forEach((trip, idx) => {
        if (trip.id === id) {
          trip.data = { ...trip.data, ...data };
        }
      });
    });

    // 초기화하고싶은 상태가 있는 slice마다 아래를 추가
    builder.addCase(PURGE, () => initialState);
  },
});
