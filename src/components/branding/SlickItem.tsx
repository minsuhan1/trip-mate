import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  imageSrc: string;
}

function SlickItem({ title, description, imageSrc }: Props) {
  return (
    <Container>
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={imageSrc} alt="branding-img" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-line;

  h1 {
    width: 70%;
    text-align: center;
    font-size: 2.8rem;
    font-weight: 700;
  }

  p {
    text-align: center;
    width: 80%;
    font-size: 1.4rem;
  }

  img {
    height: 45vh;
  }
`;

export default SlickItem;
