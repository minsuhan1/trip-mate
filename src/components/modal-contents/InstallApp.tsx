import styled from "styled-components";
import Spacing from "../common/Spacing/Spacing";

function InstallApp() {
  const isAndroid =
    typeof window !== "undefined" &&
    /android/i.test(window.navigator.userAgent);
  const isiOS =
    typeof window !== "undefined" &&
    /iphone|ipad|ipod/i.test(window.navigator.userAgent);

  return (
    <Container>
      <img src="icons/apple-touch-icon-152x152.png" alt="app-logo-img" />
      <Spacing size={30} />
      <h1>홈 화면에 앱을 추가해보세요</h1>
      <Spacing size={10} />
      {isiOS && (
        <p>
          브라우저의 "공유" 버튼을 눌러
          <br />홈 화면에 추가할 수 있어요
        </p>
      )}
      {isAndroid && (
        <p>
          "홈 화면에 추가" 또는 "추가" 버튼을 눌러
          <br />홈 화면에 추가할 수 있어요
        </p>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #787878;
  }

  p {
    font-size: 1.2rem;
    white-space: pre-line;
    text-align: center;
    color: #787878;
    font-weight: 400;
  }
`;

export default InstallApp;
