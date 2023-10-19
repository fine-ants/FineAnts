import useText from "@hooks/useText";
import { validateEmail } from "@utils/textValidators";
import SubPage from "./SubPage";

type Props = {
  onNext: (data: string) => void;
};

export default function EmailSubPage({ onNext }: Props) {
  const {
    value: email,
    isError,
    onChange,
  } = useText({ validators: [validateEmail] });

  return (
    <SubPage>
      <label htmlFor="emailInput">이메일</label>
      <input
        type="text"
        placeholder="이메일"
        id="emailInput"
        value={email}
        onChange={(e) => onChange(e.target.value.trim())}
      />
      {/* TODO: 중복 확인 */}
      <button type="button" onClick={() => {}}>
        중복 확인
      </button>

      <button type="button" onClick={() => onNext(email)} disabled={isError}>
        다음
      </button>
    </SubPage>
  );
}
