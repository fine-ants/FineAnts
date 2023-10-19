import useText from "@hooks/useText";
import { validateNickname } from "@utils/textValidators";
import SubPage from "./SubPage";

type Props = {
  onNext: (data: string) => void;
};

export default function NicknameSubPage({ onNext }: Props) {
  const { value: nickname, onChange } = useText({
    validators: [validateNickname],
  });

  return (
    <SubPage>
      <label htmlFor="nicknameInput">닉네임</label>
      <input
        type="text"
        placeholder="닉네임"
        id="nicknameInput"
        value={nickname}
        onChange={(e) => onChange(e.target.value.trim())}
      />
      <button type="button" onClick={() => {}}>
        중복 확인
      </button>

      <p>영문/한글/숫자 (2~10자)</p>

      {/* TODO: Disabled condition */}
      <button type="button" onClick={() => onNext(nickname)}>
        다음
      </button>
    </SubPage>
  );
}
