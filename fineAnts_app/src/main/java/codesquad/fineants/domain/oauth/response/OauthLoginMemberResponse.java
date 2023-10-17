package codesquad.fineants.domain.oauth.response;

import codesquad.fineants.domain.member.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class OauthLoginMemberResponse {
	private String nickname;
	private String email;
	private String profileUrl;

	public static OauthLoginMemberResponse from(Member member) {
		return new OauthLoginMemberResponse(member.getNickname(), member.getEmail(), member.getProfileUrl());
	}

	@Override
	public String toString() {
		return String.format("%s, %s(nickname=%s, email=%s, profileUrl=%s)", "로그인 회원정보 응답",
			this.getClass().getSimpleName(), nickname, email, profileUrl);
	}
}
