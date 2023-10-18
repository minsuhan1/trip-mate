import { useState, useEffect, useRef } from "react";

import { Color, Element, Info, Menu, Time } from "./Schedule.styled";
import IconButton from "../common/IconButton/IconButton";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as XMarkIcon } from "../../assets/icons/x-mark.svg";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../contexts/auth-context";
import { useAppDispatch } from "../../hooks/useApp";
import { deleteSchedule } from "../../store/scheduleReducer";

interface ScheduleProp {
  id: string;
  title: string;
  trip_id: string;
  description?: string;
  address?: string;
  start_time: number;
  end_time: number;
  isOddIdx: boolean;
}

function Schedule(props: ScheduleProp) {
  const navigate = useNavigate();
  const authCtx = useAuthState();
  const dispatch = useAppDispatch();

  // 스케줄 메뉴 제어를 위한 상태
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  // 스케줄 메뉴 여닫기
  const toggleMenu = (e: React.MouseEvent) => {
    // 타입스크립트의 e.target은 HTMLElement를 확장하지 않아서 타입을 단언(assertion)했음
    if ((e.target as HTMLElement).closest(".nav-schedule-menu")) return;
    setMenuOpened(!menuOpened);
  };

  // 외부 영역 클릭 시 스케줄 메뉴 닫기
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpened(false);
      }
    };
    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, [menuRef]);

  // 스케줄 삭제버튼 핸들러
  const onDelete = () => {
    if (authCtx.user) {
      if (window.confirm(`'${props.title}' 스케줄을 삭제할까요?`)) {
        dispatch(
          deleteSchedule({
            uid: authCtx.user.uid,
            tripId: props.trip_id,
            id: props.id,
          })
        );
      }
    }
  };

  return (
    <>
      <Element
        onClick={(e) => {
          toggleMenu(e);
        }}
      >
        {/* 라벨 색 */}
        <Color
          style={{
            backgroundColor: props.isOddIdx
              ? "var(--third-color)"
              : "var(--primary-color)",
          }}
        ></Color>
        {/* 시간 */}
        <Time>
          <div>
            {new Date(props.start_time).toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>&ndash;</div>
          <div>
            {new Date(props.end_time).toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </Time>
        {/* 제목, 설명, 주소 */}
        <Info>
          <h1>{props.title}</h1>
          {props.description && <h2>{props.description}</h2>}
          {props.address && <p>{props.address}</p>}
        </Info>

        {/* 클릭시 수정/삭제 메뉴 표시 */}
        {menuOpened && (
          <Menu ref={menuRef}>
            <nav className="nav-schedule-menu">
              <IconButton
                onClick={() => {
                  // navigate("/home");
                }}
              >
                <EditIcon width={"85%"} />
              </IconButton>
              <IconButton onClick={onDelete}>
                <XMarkIcon />
              </IconButton>
            </nav>
          </Menu>
        )}
      </Element>
    </>
  );
}

export default Schedule;
