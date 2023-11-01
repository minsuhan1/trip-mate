import imageCompression from "browser-image-compression";
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

// 이미지 압축해주는 메서드
export const compressImage = async (fileSrc: File) => {
  if (!fileSrc) return;

  // 0.5MB 이상이면 압축
  if (fileSrc.size > 512 * 512) {
    const options = {
      maxSizeMB: 0.5,
      useWebWorker: true,
    };

    try {
      return await imageCompression(fileSrc, options);
    } catch (e) {
      console.log(e);
    }
  } else {
    return fileSrc;
  }
};
