import React from "react";
import useForm from "../../../hooks/useForm";
import { FormContext } from "../../../contexts/form-context";
import styled from "styled-components";

interface IFormProps {
  children: React.ReactNode;
  props: {
    initialValues: { [key: string]: any };
    validate: Function;
    onSubmit: Function;
  };
}

export interface IFormValue {
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getFieldProps: (name: string) => {};
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

function Form({ children, props }: IFormProps) {
  const formValue: IFormValue = useForm(props);

  // Provider에 폼 데이터를 전달
  return (
    <FormContext.Provider value={formValue}>
      <StyledForm onSubmit={formValue.handleSubmit} id="form">
        {children}
      </StyledForm>
    </FormContext.Provider>
  );
}

export default Form;
