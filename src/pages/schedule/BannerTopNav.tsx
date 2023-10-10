import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import IconButton from "../../components/common/IconButton";
import { ReactComponent as ChevIconLeft } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as EllipsisVerticalIcon } from "../../assets/icons/ellipsis-vertical.svg";
import DropdownMenu from "../../components/common/DropdownMenu";
import { useNavigate } from "react-router-dom";

export const TopNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;

  div:last-child {
    display: flex;
    gap: 5px;
  }
`;

function BannerTopNav() {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [viewMenu, setViewMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  // 외부 영역 클릭 시 모달 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setViewMenu(false);
      }
    };
    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, [dropDownRef]);

  return (
    <TopNav>
      <div>
        <IconButton
          onClick={() => {
            navigate("/home");
          }}
        >
          <ChevIconLeft />
        </IconButton>
      </div>
      <div>
        <div ref={dropDownRef}>
          <IconButton
            onClick={() => {
              setViewMenu(!viewMenu);
            }}
          >
            <EllipsisVerticalIcon />
            {viewMenu && (
              <DropdownMenu
                menuArr={[
                  { label: "수정", onClick: () => {} },
                  { label: "삭제", onClick: () => {} },
                  { label: "사진으로 저장", onClick: () => {} },
                ]}
              />
            )}
          </IconButton>
        </div>
      </div>
    </TopNav>
  );
}

export default BannerTopNav;
