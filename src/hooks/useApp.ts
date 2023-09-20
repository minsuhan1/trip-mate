import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/index";

/**
 * 타입스크립트에서 useDispatch와 useSelector은 타입을 정의하지 않으면 오류가 발생하기 때문에 hook으로 만들어 사용
 */

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
