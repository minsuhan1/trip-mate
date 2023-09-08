import React from "react";
import styled from "styled-components";

/**
 * 내부 엘리먼트들을 세로(기본) 또는 가로로 중앙정렬시켜주는 wrapper 컴포넌트를 생성
 */

interface styledDivProps {
  $flexRow?: boolean;
  $gapValue?: number;
}

const StyledDiv = styled.div<styledDivProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $gapValue }) => $gapValue || 0}px;
  flex-direction: ${({ $flexRow }) => ($flexRow ? "row" : "column")};
`;

interface FlexContainerProps {
  children: React.ReactNode;
  gapValue?: number;
  flexRow?: boolean;
}

function FlexContainer({ children, gapValue, flexRow }: FlexContainerProps) {
  return (
    <StyledDiv $gapValue={gapValue} $flexRow={flexRow}>
      {children}
    </StyledDiv>
  );
}

export default FlexContainer;
