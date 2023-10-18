import useText from "@hooks/useText";
import { validatePassword } from "@utils/textValidators";
import SubPage from "./SubPage";

type Props = {
  onNext: (data: string) => void;
};

export default function PasswordSubPage({ onNext }: Props) {
  const { value: password, onChange: onPasswordChange } = useText({
    validators: [validatePassword],
  });
  const { value: passwordConfirm, onChange: onPasswordConfirmChange } = useText(
    {
      validators: [validatePassword],
    }
  );

  // const isPasswordMatch = password === passwordConfirm;

  return (
    <SubPage>
      <div>
        <label htmlFor="passwordInput">비밀번호</label>
        <input
          type="text"
          placeholder="비밀번호"
          id="passwordInput"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value.trim())}
        />
        <p>영문, 숫자, 특수문자 최소 1개 (8~16자)</p>
      </div>

      <div>
        <label htmlFor="passwordConfirmInput">비밀번호 확인</label>
        <input
          type="text"
          placeholder="비밀번호 확인"
          id="passwordConfirmInput"
          value={passwordConfirm}
          onChange={(e) => onPasswordConfirmChange(e.target.value.trim())}
        />
        {/* TODO: Error 비밀번호가 일치하지 않습니다 */}
      </div>

      {/* TODO: Disabled condition */}
      <button type="button" onClick={() => onNext(password)}>
        다음
      </button>
    </SubPage>
  );
}
