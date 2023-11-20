import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar/NavBar";
import TripEditForm from "../../components/forms/trip/TripEditForm";
import { PageWrapperPadding15 } from "../../styles/page-wrap-padding-15";

function TripEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.search;
  const id = new URLSearchParams(query).get("id");

  return (
    <PageWrapperPadding15>
      <NavBar
        backItemTitle="취소"
        topItemTitle={"여행일정 " + (id ? "수정" : "생성")}
        doneItemTitle="저장"
        onBackHandler={() => {
          navigate(-1);
        }}
      />
      {id ? <TripEditForm id={id} /> : <TripEditForm />}
    </PageWrapperPadding15>
  );
}

export default TripEditPage;
