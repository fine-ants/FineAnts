import useSignUpMutation from "api/auth/queries/useSignUpMutation";
import useText from "hooks/useText";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "utils/textValidators";

export default function SignUpPage() {
  const navigate = useNavigate();

  const { mutate: signUpMutate } = useSignUpMutation();

  const {
    value: nickname,
    error: nicknameError,
    isError: isNicknameError,
    onChange: onNicknameChange,
  } = useText({
    validators: [validateNickname],
  });

  const {
    value: email,
    error: emailError,
    isError: isEmailError,
    onChange: onEmailChange,
  } = useText({ validators: [validateEmail] });

  const {
    value: password,
    error: passwordError,
    isError: isPasswordError,
    onChange: onPasswordChange,
  } = useText({ validators: [validatePassword] });

  const { value: passwordConfirm, onChange: onPasswordConfirmChange } =
    useText();

  const onSignUp = async (e: FormEvent) => {
    e.preventDefault();

    // TODO
    // const formData = new FormData();
    // formData.append(
    //   "request",
    //   new Blob([JSON.stringify({ email, password, nickname })], {
    //     type: "application/json",
    //   })
    // );
    // if (profileImage) {
    //   formData.append("image", profileImage);
    // }

    // signUpMutate(formData);
  };

  return (
    <Form onSubmit={onSignUp}>
      <input
        type="text"
        value={nickname}
        onChange={(e) => onNicknameChange(e.target.value.trim())}
      />
      <input
        type="text"
        value={email}
        onChange={(e) => onEmailChange(e.target.value.trim())}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value.trim())}
      />
      <input
        type="text"
        value={passwordConfirm}
        onChange={(e) => onPasswordConfirmChange(e.target.value.trim())}
      />
    </Form>
  );
}

const Form = styled.form``;
