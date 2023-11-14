import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { Container } from "./ChecklistPage.styled";
import List from "../../components/checklist/List";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { IChecklistItem, setChecklist } from "../../store/checklistReducer";
import { useAuthState } from "../../contexts/auth-context";
import Spacing from "../../components/common/Spacing/Spacing";

function ChecklistPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const authCtx = useAuthState();
  const dispatch = useAppDispatch();
  const checklist = useAppSelector((state) => state.checklistReducer.state);

  // 체크리스트 관리
  const [list, setList] = useState<IChecklistItem[]>(
    checklist ? [...checklist] : []
  );

  // 목록 추가 버튼 핸들러
  const onAdd = () => {
    let promptValue = prompt("무엇을 준비해야 하나요?");

    if (promptValue && promptValue.replace(/^\s+|\s+$/g, "")) {
      setList((prev) => [
        ...prev,
        {
          title: promptValue!,
          id: Date.now(),
          created_at: Date.now(),
          done: false,
        },
      ]);
    }
  };

  // 목록 삭제 버튼 핸들러
  const onDelete = (id: number) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  // 완료여부 토글 핸들러
  const onToggleDone = (id: number) => {
    const tempList = [...list];

    setList(
      tempList.map((item, idx) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        } else {
          return item;
        }
      })
    );
  };

  // list 상태가 업데이트될때마다 DB 반영
  useEffect(() => {
    if (authCtx.user && tripId) {
      dispatch(
        setChecklist({ uid: authCtx.user.uid, tripId: tripId, data: list })
      );
    }
  }, [authCtx.user, list, dispatch, tripId]);

  return (
    <Container>
      <nav>
        <ChevronLeftIcon width={25} onClick={() => navigate("..")} />
        <PlusIcon width={25} onClick={onAdd} />
      </nav>
      <h1>체크리스트</h1>
      <List list={[...list]} onDelete={onDelete} onToggleDone={onToggleDone} />
      <Spacing size={100} />
    </Container>
  );
}

export default ChecklistPage;
