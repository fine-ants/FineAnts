import useText from "@hooks/useText";
import { validateEmail } from "@utils/textValidators";
import SubPage from "./SubPage";

type Props = {
  onNext: (data: string) => void;
};

export default function EmailSubPage({ onNext }: Props) {
  const { value: email, onChange } = useText({ validators: [validateEmail] });

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
      <button type="button" onClick={() => {}}>
        중복 확인
      </button>

      {/* TODO: Disabled condition */}
      <button type="button" onClick={() => onNext(email)}>
        다음
      </button>
    </SubPage>
  );
}
