import { Link } from "react-router-dom";
import FlexContainer from "../styles/flexContainer";

function NotFound() {
  return (
    <FlexContainer gapValue={10}>
      <h1>404</h1>
      <p>아무것도 없네요!</p>
      <Link to="/">
        <button>홈으로</button>
      </Link>
    </FlexContainer>
  );
}

export default NotFound;
