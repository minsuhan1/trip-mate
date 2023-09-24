import InputField from "../common/form/InputField";
import Form from "../common/form/Form";
import ErrorMessage from "../common/form/ErrorMessage";

function ProfileEditForm() {
  const validate = (values: { nickname: string; description: string }) => {
    const errors = {
      nickname: "",
      description: "",
    };

    if (!values.nickname) errors.nickname = "닉네임이 입력되지 않았어요";
    if (!values.description)
      errors.description = "한줄소개가 입력되지 않았어요";

    return errors;
  };

  const handleSubmit = (values: { nickname: string; description: string }) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Form
      props={{
        initialValues: { nickname: "", description: "" },
        validate: validate,
        onSubmit: handleSubmit,
      }}
    >
      <InputField
        type="text"
        name="nickname"
        label="닉네임 *"
        placeholder="닉네임을 입력해주세요"
      />
      <ErrorMessage name="nickname" />
      <InputField
        type="text"
        name="description"
        label="한줄소개 *"
        placeholder="한줄소개를 입력해주세요"
      />
      <ErrorMessage name="description" />

      <p>
        <button type="submit">완료</button>
      </p>
    </Form>
  );
}

export default ProfileEditForm;
