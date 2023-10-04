import { MILLISEC_1DAY } from "../constants/constants";

// 디데이 구하는 함수
// targetTimestamp: 타겟 날짜의 밀리초 시간
export const calcRemainingDays = (targetTimestamp: number) => {
  const today = new Date();
  return Math.trunc(
    (targetTimestamp -
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ).getTime()) /
      MILLISEC_1DAY
  );
};
