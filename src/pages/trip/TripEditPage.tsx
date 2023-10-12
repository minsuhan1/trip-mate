import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import TripEditForm from "../../components/trip/TripEditForm";

function TripEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.search;
  const id = new URLSearchParams(query).get("id");

  return (
    <div>
      <NavBar
        backItemTitle="취소"
        topItemTitle={"여행일정 " + (id ? "수정" : "생성")}
        doneItemTitle="저장"
        onBackHandler={() => {
          navigate(-1);
        }}
      />
      {id ? <TripEditForm id={id} /> : <TripEditForm />}
    </div>
  );
}

export default TripEditPage;
