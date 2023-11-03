import { createContext, useState, useContext } from "react";
import { createPortal } from "react-dom";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner";

interface ILoadingState {
  setVisible: (value: boolean) => void;
}

const LoadingContext = createContext<ILoadingState>({
  setVisible: (value: boolean) => {},
});

// 로딩 상태 Context provider
export function LoadingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ setVisible }}>
      {visible && createPortal(<LoadingSpinner />, document.body)}
      {children}
    </LoadingContext.Provider>
  );
}

// custom hook
export function useLoadingState() {
  const { setVisible } = useContext(LoadingContext);
  return { setLoading: setVisible };
}
