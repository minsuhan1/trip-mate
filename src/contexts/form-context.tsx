import { createContext } from "react";
import { IFormValue } from "../components/common/Form/Form";

// FormContext는 useForm의 반환값(타입: IFormValue)을 Provider의 값으로 하여 관리한다.
export const FormContext = createContext({} as IFormValue);
FormContext.displayName = "FormContext";
