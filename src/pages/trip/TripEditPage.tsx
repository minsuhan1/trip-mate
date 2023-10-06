import { useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import TripEditForm from "../../components/trip/TripEditForm";

function TripEditPage() {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar
        backItemTitle="취소"
        topItemTitle="여행일정 생성"
        doneItemTitle="저장"
        onBackHandler={() => {
          navigate(-1);
        }}
      />
      <TripEditForm />
    </div>
  );
}

export default TripEditPage;
