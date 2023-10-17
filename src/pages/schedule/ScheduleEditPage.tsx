import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar/NavBar";
import ScheduleEditForm from "../../components/forms/schedule/ScheduleEditForm";

function ScheduleEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.search;
  const id = new URLSearchParams(query).get("id");
  const day = new URLSearchParams(query).get("day");

  return (
    <div>
      <NavBar
        backItemTitle="취소"
        topItemTitle={"스케줄 " + (id ? "수정" : `생성 - ${day}일차`)}
        doneItemTitle="저장"
        onBackHandler={() => {
          navigate(-1);
        }}
      />
      {id ? (
        <ScheduleEditForm id={id} />
      ) : day ? (
        <ScheduleEditForm day={day} />
      ) : (
        <Navigate to="/home" />
      )}
    </div>
  );
}

export default ScheduleEditPage;
