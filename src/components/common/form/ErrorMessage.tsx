import { useContext } from "react";
import { FormContext } from "../../../contexts/form-context";

function ErrorMessage({ name }: { name: string }) {
  const { touched, errors } = useContext(FormContext);
  if (!touched[name] || !errors[name]) {
    return null;
  }
  return <span>{errors[name]}</span>;
}

export default ErrorMessage;
