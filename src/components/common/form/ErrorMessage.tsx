import { useContext } from "react";
import { styled } from "styled-components";
import { FormContext } from "../../../contexts/form-context";

const StyledSpan = styled.span`
  color: #ff0000;
  font-size: 1rem;
  padding: 0px 8px;
  margin: 2px 0;
`;

function ErrorMessage({ name }: { name: string }) {
  const { touched, errors } = useContext(FormContext);
  if (!touched[name] || !errors[name]) {
    return null;
  }
  return <StyledSpan>{errors[name]}</StyledSpan>;
}

export default ErrorMessage;
