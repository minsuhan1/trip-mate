import { useState } from "react";
import { Container } from "./List.styled";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg";
import { IChecklistItem } from "../../store/checklistReducer";

interface ListProp {
  list: IChecklistItem[];
  onDelete: (id: number) => void;
  onToggleDone: (id: number) => void;
}

function List(props: ListProp) {
  // 검색 키워드 관리
  const [keyword, setKeyword] = useState<string>("");

  // 키워드 입력 감지 핸들러
  const onChange = (e: React.ChangeEvent) =>
    setKeyword((e.target as HTMLInputElement).value);

  // 키워드 필터링된 리스트
  const filteredList = props.list.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
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
            <div className="label">
              {/* 완료여부 라벨 */}
              <div
                className="circle"
                onClick={() => {
                  props.onToggleDone(item.id);
                }}
              >
                {item.done && <div className="done"></div>}
              </div>
              {/* 제목 */}
              {item.done ? (
                <div className="title title-gray">{item.title}</div>
              ) : (
                <div className="title">{item.title}</div>
              )}
            </div>
            <div
              className="remove"
              onClick={() => {
                props.onDelete(item.id);
              }}
            >
              <MinusIcon width={15} strokeWidth={2} />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default List;
