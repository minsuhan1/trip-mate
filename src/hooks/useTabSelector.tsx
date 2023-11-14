import { useState } from "react";
import TabSelector from "../components/common/TabSelector/TabSelector";

type HookResult = [string, () => React.ReactNode];

// 주어진 메뉴 중 하나를 선택하는 selector를 쉽게 사용하기 위한 custom hook
function useTabSelector(items: string[], initIdx: number): HookResult {
  const [selectedIdx, setSeletedIdx] = useState<number>(initIdx);

  const onTabClick = (idx: number) => setSeletedIdx(idx);

  const renderTabSelector = () => (
    <TabSelector items={items} onClick={onTabClick} selectedIdx={selectedIdx} />
  );

  return [items[selectedIdx], renderTabSelector];
}

export default useTabSelector;
