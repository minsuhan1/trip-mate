import styled from "styled-components";
import ModalContainer from "./ModalContainer";
import { useEffect, useRef } from "react";
import { ReactComponent as XMarkIcon } from "../../../assets/icons/x-mark.svg";
import useClickOutside from "../../../hooks/useClickOutside";

interface Props {
  children: React.ReactNode;
  onClose: Function;
}

function Modal({ children, onClose }: Props) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose();
  };

  // 모달창이 표시될 동안 외부 스크롤을 막는다
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body!.style.overflow;
    $body!.style.overflow = "hidden";

    // 닫을 때 다시 복구
    return () => {
      $body!.style.overflow = overflow;
    };
  }, []);

  // 외부 영역을 클릭하면 모달을 닫는다
  useClickOutside({ ref: modalRef, callback: handleClose });

  return (
    <ModalContainer>
      <Overlay>
        <ModalWrap ref={modalRef}>
          <CloseButton onClick={handleClose}>
            <XMarkIcon width={"100%"} strokeWidth={2} />
          </CloseButton>
          {children}
        </ModalWrap>
      </Overlay>
    </ModalContainer>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 300px;
  height: fit-content;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export default Modal;
