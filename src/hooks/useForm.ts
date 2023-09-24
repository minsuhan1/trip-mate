import { useState, useCallback, useEffect } from "react";

function useForm({
  initialValues,
  validate,
  onSubmit,
}: {
  initialValues: { [key: string]: any };
  validate: Function;
  onSubmit: Function;
}) {
  const [values, setValues] = useState(initialValues as { [key: string]: any });
  const [errors, setErrors] = useState({} as { [key: string]: string });
  const [touched, setTouched] = useState({} as { [key: string]: boolean });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 필드에 방문했다고 표시한다
    // 타입스크립트에게 init을 제공하여 touched 타입을 정의해준다
    let init: { [key: string]: boolean } = {};
    setTouched(
      Object.keys(values).reduce((touched, field) => {
        touched[field] = true;
        return touched;
      }, init)
    );

    // 필드 검사
    const errors = validate(values);

    // 에러 값 설정
    setErrors(errors);

    // 잘못된 값이면 제출 처리 중단
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    // useForm의 폼 제출을 완료하고 사용하는 쪽에 알린다
    onSubmit(values);
  };

  // 입력값에 따라 검증 함수를 실행하는 함수
  const runValidator = useCallback(() => validate(values), [values, validate]);

  // 검증함수가 변경될 때마다 호출한다
  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator]);

  // 필드 속성으로 사용할 값을 조회한다
  const getFieldProps = (name: string) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  // Hook 사용자에게 제공하는 API
  return {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
  };
}

export default useForm;
