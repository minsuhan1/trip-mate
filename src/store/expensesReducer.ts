import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import ExpensesAPI from "../utils/expenses/apis";

// 여행경비 데이터 인터페이스
export interface IExpenseData {
  [key: string]: any;
  trip_id: string;
  title: string;
  datetime: number;
  type: "항공" | "숙박" | "교통" | "식사" | "쇼핑" | "기타";
  map_data: {
    latitude: number;
    longitude: number;
    name: string;
    address: string;
  } | null;
  created_at: number;
  updated_at: number;
}

// 여행경비 인터페이스
export interface IExpense {
  id: string;
  data: IExpenseData;
}

// 여행경비 목록 인터페이스
export interface IExpenseList extends Array<IExpense> {}

// 여행경비 목록 상태 인터페이스
export interface IExpenseListState {
  status: "loading" | "loaded" | "error";
  tripId: string | undefined;
  state: IExpenseList | undefined;
}

// 여행경비 목록 상태 초기값
const initialState: IExpenseListState = {
  status: "loading",
  tripId: undefined,
  state: undefined,
};

// 여행경비 목록을 가져오는 비동기 작업을 수행하는 thunk
export const getExpenseList = createAsyncThunk(
  "GET_EXPENSE_LIST",
  async (args: { uid: string; tripId: string }, thunkAPI) => {
    const data = await ExpensesAPI.get(args.uid, args.tripId);
    return { data, tripId: args.tripId };
  }
);

// 여행경비를 추가하는 비동기 작업을 수행하는 thunk
export const addExpense = createAsyncThunk(
  "CREATE_EXPENSE",
  async (args: { uid: string; data: IExpenseData }, thunkAPI) => {
    return ExpensesAPI.add(args.uid, args.data);
  }
);

// 여행경비를 업데이트하는 비동기 작업을 수행하는 thunk
export const updateExpense = createAsyncThunk(
  "UPDATE_EXPENSE",
  async (
    args: {
      uid: string;
      data: { [key: string]: any };
      tripId: string;
      id: string;
    },
    thunkAPI
  ) => {
    return ExpensesAPI.update(args.uid, args.tripId, args.id, args.data);
  }
);

// 여행경비를 삭제하는 비동기 작업을 수행하는 thunk
export const deleteExpense = createAsyncThunk(
  "DELETE_EXPENSE",
  async (args: { uid: string; tripId: string; id: string }, thunkAPI) => {
    return ExpensesAPI.delete(args.uid, args.tripId, args.id);
  }
);

// 여행경비 목록 상태 slice
export const expenseListSlice = createSlice({
  name: "expense_list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpenseList.fulfilled, (state, action) => {
      state.status = "loaded";
      state.tripId = action.payload.tripId;
      state.state = action.payload.data;
    });

    // 초기화하고싶은 상태가 있는 slice마다 아래를 추가
    builder.addCase(PURGE, () => initialState);
  },
});
