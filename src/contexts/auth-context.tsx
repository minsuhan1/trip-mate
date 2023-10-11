import React, { useEffect, useState, createContext, useContext } from "react";
import { User } from "firebase/auth";
import { auth } from "../services/firebase";

/**
 * [인증 상태 타입 정의]
 * state: 로그인 요청 중 | 결과 수신 | 에러 발생
 * isAuthenticated: 인증정보 존재여부
 * user: 현재 유저 객체(User)
 */
export type AuthState = {
  state: "loading" | "loaded" | "error";
  isAuthenticated: boolean;
  user: User | null;
  error?: Error;
};

/** 인증 상태에 대한 Context 생성 */
const AuthStateContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/** 인증 상태 Context에 대한 Provider */
export function AuthContextProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    state: "loading",
    isAuthenticated: false,
    user: null,
  });

  /** 인증 정보 변경(로그인, 로그아웃) 감지 시 인증 상태 업데이트 */
  const onChange = (user: User | null) => {
    if (user) {
      setAuthState({ state: "loaded", isAuthenticated: true, user });
    } else {
      setAuthState({ state: "loaded", isAuthenticated: false, user });
    }
  };

  /** 인증 과정에서 에러 발생시 인증 상태를 error로 업데이트 */
  const setError = (error: Error) => {
    setAuthState({ ...authState, state: "error", error });
  };

  /** 인증 정보 변경 감지 */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange, setError);
    return () => unsubscribe();
  }, []);

  return (
    <AuthStateContext.Provider value={authState}>
      {children}
    </AuthStateContext.Provider>
  );
}

/** 인증 상태 Context를 쉽게 사용하기 위한 Custom Hook */
export function useAuthState() {
  const authState = useContext(AuthStateContext);
  if (!authState) throw new Error("AuthContextProvider not found");
  return authState;
}
