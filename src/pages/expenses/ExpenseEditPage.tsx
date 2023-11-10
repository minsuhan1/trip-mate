import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar/NavBar";
import ExpenseEditForm from "../../components/forms/expense/ExpenseEditForm";

function ExpenseEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.search;
  const id = new URLSearchParams(query).get("id");

  return (
    <div>
      <NavBar
        backItemTitle="취소"
        topItemTitle={"여행경비 " + (id ? "수정" : "추가")}
        doneItemTitle="저장"
        onBackHandler={() => {
          navigate(-1);
        }}
      />
      {id ? <ExpenseEditForm id={id} /> : <ExpenseEditForm id={null} />}
    </div>
  );
}

export default ExpenseEditPage;
