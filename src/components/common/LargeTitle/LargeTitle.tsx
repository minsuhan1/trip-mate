import styled from "styled-components";

function LargeTitle({ title }: { title: string }) {
  return <Container>{title}</Container>;
}

const Container = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
`;

export default LargeTitle;
