import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import IconButton from "../common/IconButton";
import { ReactComponent as ChevIconLeft } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as EllipsisVerticalIcon } from "../../assets/icons/ellipsis-vertical.svg";
import DropdownMenu from "../common/DropdownMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "../../contexts/auth-context";
import { deleteTrip } from "../../store/triplistReducer";
import { useAppDispatch } from "../../hooks/useApp";

export const TopNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

function BannerTopNav() {
  const authCtx = useAuthState();
  const dispatch = useAppDispatch();
  const [viewMenu, setViewMenu] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const tripId = params.tripId;

  const onDelete = async () => {
    if (authCtx.user && tripId) {
      if (window.confirm("여행 일정을 삭제할까요?")) {
        await dispatch(deleteTrip({ uid: authCtx.user.uid, id: tripId }));
        navigate("/home");
      }
    }
  };

  // 외부 영역 클릭 시 드롭다운 메뉴 닫기
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
                  {
                    label: "수정",
                    onClick: () => {
                      navigate(`/create?id=${tripId}`);
                    },
                  },
                  { label: "삭제", onClick: onDelete },
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
