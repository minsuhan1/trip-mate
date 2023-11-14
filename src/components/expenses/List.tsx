import { useState } from "react";
import { IExpenseList } from "../../store/expensesReducer";
import { Container } from "./styles/List.styled";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import Item from "./Item";
import { useNavigate } from "react-router-dom";

interface ListProp {
  list: IExpenseList;
}

function List(props: ListProp) {
  const navigate = useNavigate();

  // 검색 키워드 관리
  const [keyword, setKeyword] = useState<string>("");

  // 키워드 입력 감지 핸들러
  const onChange = (e: React.ChangeEvent) =>
    setKeyword((e.target as HTMLInputElement).value);

  // 키워드 필터링된 리스트
  const filteredList = props.list.filter((item) =>
    item.data.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <Container>
      {/* 검색창 */}
      <div className="search-box">
        <SearchIcon width={18} />
        <input placeholder="검색" value={keyword} onChange={onChange}></input>
      </div>
      {/* 리스트 */}
      <ul>
        {filteredList.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(`./${item.id}`);
            }}
          >
            <Item data={item.data} />
          </div>
        ))}
      </ul>
    </Container>
  );
}

export default List;
