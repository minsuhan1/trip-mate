import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { PageWrapperPadding15 } from "../styles/page-wrap-padding-15";
import styled from "styled-components";
import { ReactComponent as ErrorIllust } from "../assets/illustrations/error.svg";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error) && error.status === 404) {
      return "존재하지 않는 페이지입니다";
    } else {
      return "오류가 발생했어요";
    }
  }

  return (
    <PageWrapperPadding15>
      <Container>
        <ErrorIllust width={"50%"} height={200} />
        <h1>{errorMessage(error)}</h1>
        <button onClick={() => navigate("/")}>홈으로 가기</button>
      </Container>
    </PageWrapperPadding15>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  button {
    font-weight: 600;
    border-radius: 8px;
    font-size: 1.4rem;
    padding: 8px 16px;
    background-color: var(--secondary-color-lighten);
    color: var(--primary-color);
  }
`;
