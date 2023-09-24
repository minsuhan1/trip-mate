import React from "react";
import useForm from "../../../hooks/useForm";
import { FormContext } from "../../../contexts/form-context";

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

function Form({ children, props }: IFormProps) {
  const formValue: IFormValue = useForm(props);

  // Provider에 폼 데이터를 전달
  return (
    <FormContext.Provider value={formValue}>
      <form onSubmit={formValue.handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
}

export default Form;
