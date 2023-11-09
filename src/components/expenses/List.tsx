import { useState } from "react";
import { IExpenseList } from "../../store/expensesReducer";
import { Container } from "./List.styled";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

interface ListProp {
  list: IExpenseList;
}

function List(props: ListProp) {
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
          <li key={item.id}>
            <div>{item.data.title}</div>
            <div>{item.data.datetime}</div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default List;
