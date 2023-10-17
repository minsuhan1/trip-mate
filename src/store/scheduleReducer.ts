import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import ScheduleAPI from "../utils/schedule/apis";

// 스케줄 데이터 인터페이스
export interface IScheduleData {
  [key: string]: any;
  trip_id: string;
  title: string;
  description?: string;
  start_time: number;
  end_time: number;
  map_data?: {
    latitude: number;
    longitude: number;
    name: string;
    address: string;
  };
  created_at: number;
  updated_at: number;
}

// 스케줄 인터페이스
export interface ISchedule {
  id: string;
  data: IScheduleData;
}

// 스케줄 목록 인터페이스
export interface IScheduleList extends Array<ISchedule> {}

// 스케줄 목록 상태 인터페이스
export interface IScheduleListState {
  status: "loading" | "loaded" | "error";
  tripId: string | undefined;
  state: IScheduleList | undefined;
}

// 스케줄 목록 상태 초기값
const initialState: IScheduleListState = {
  status: "loading",
  tripId: undefined,
  state: undefined,
};

// 스케줄 목록을 가져오는 비동기 작업을 수행하는 thunk
export const getScheduleList = createAsyncThunk(
  "GET_SCHEDULE_LIST",
  async (args: { uid: string; tripId: string }, thunkAPI) => {
    const data = await ScheduleAPI.get(args.uid, args.tripId);
    return { data, tripId: args.tripId };
  }
);

// 스케줄을 추가하는 비동기 작업을 수행하는 thunk
export const addSchedule = createAsyncThunk(
  "CREATE_SCHEDULE",
  async (args: { uid: string; data: IScheduleData }, thunkAPI) => {
    return ScheduleAPI.add(args.uid, args.data);
  }
);

// 스케줄을 업데이트하는 비동기 작업을 수행하는 thunk
export const updateSchedule = createAsyncThunk(
  "UPDATE_SCHEDULE",
  async (
    args: {
      uid: string;
      data: { [key: string]: any };
      tripId: string;
      id: string;
    },
    thunkAPI
  ) => {
    return ScheduleAPI.update(args.uid, args.tripId, args.id, args.data);
  }
);

// 스케줄을 삭제하는 비동기 작업을 수행하는 thunk
export const deleteSchedule = createAsyncThunk(
  "DELETE_SCHEDULE",
  async (args: { uid: string; tripId: string; id: string }, thunkAPI) => {
    return ScheduleAPI.delete(args.uid, args.tripId, args.id);
  }
);

// 스케줄 목록 상태 slice
export const scheduleListSlice = createSlice({
  name: "schedule_list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScheduleList.fulfilled, (state, action) => {
      state.status = "loaded";
      state.tripId = action.payload.tripId;
      state.state = action.payload.data;
    });

    builder.addCase(addSchedule.fulfilled, (state, action) => {
      // 생성된 id의 스케줄 데이터를 상태에 추가
      const { id, data } = action.payload;
      state.state?.push({ id, data });
    });

    builder.addCase(deleteSchedule.fulfilled, (state, action) => {
      const deleted_id = action.payload;
      // 삭제한 id의 스케줄 데이터를 상태에서 제거
      state.state = state.state?.filter(
        (schedule) => schedule.id !== deleted_id
      );
    });

    builder.addCase(updateSchedule.fulfilled, (state, action) => {
      // 수정한 스케줄 id, 수정 내용
      const { id, data } = action.payload;
      // 수정된 내용을 상태에 반영
      state.state?.forEach((schedule, idx) => {
        if (schedule.id === id) {
          schedule.data = { ...schedule.data, ...data };
        }
      });
    });

    // 초기화하고싶은 상태가 있는 slice마다 아래를 추가
    builder.addCase(PURGE, () => initialState);
  },
});
