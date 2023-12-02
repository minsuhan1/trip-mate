import { createContext, useContext, useState } from "react";
import Modal from "../components/common/Modal/Modal";

type IModalContent = React.ReactNode | null;

interface IModalSetter {
  setContent: (content: IModalContent) => void;
}

const ModalContentContext = createContext<IModalContent>(null);
const ModalSetterContext = createContext<IModalSetter>({
  setContent: (content: IModalContent) => {},
});

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<IModalContent>(null);

  return (
    <ModalSetterContext.Provider value={{ setContent }}>
      <ModalContentContext.Provider value={content}>
        {content && (
          <Modal children={content} onClose={() => setContent(null)} />
        )}
        {children}
      </ModalContentContext.Provider>
    </ModalSetterContext.Provider>
  );
}

// custom hook
export function useModal() {
  const { setContent } = useContext(ModalSetterContext);

  const openModal = (content: IModalContent) => setContent(content);
  const closeModal = () => setContent(null);

  return { openModal: openModal, closeModal: closeModal };
}
