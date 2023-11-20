import React, { useContext } from "react";
import { StyledDiv } from "./InputField.styled";
import { FormContext } from "../../../contexts/form-context";

interface InputFieldProps {
  type: React.HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
  name: string;
  iconPath?: string;
  min?: string;
  max?: string;
}

function InputField(props: InputFieldProps) {
  const { getFieldProps } = useContext(FormContext);

  return (
    <StyledDiv>
      <label>{props.label}</label>
      <input
        {...props}
        {...getFieldProps(props.name)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        inputMode={props.type === "number" ? "numeric" : undefined}
        pattern={props.type === "number" ? "[0-9]*" : undefined}
        data-placeholder={props.type === "date" && props.placeholder}
        required={props.type === "date" && true}
        min={props.type === "datetime-local" ? props.min : undefined}
        max={props.type === "datetime-local" ? props.max : undefined}
      />
      {props.iconPath ? (
        <img src={props.iconPath} alt="icon" width={20} />
      ) : null}
    </StyledDiv>
  );
}

export default InputField;
