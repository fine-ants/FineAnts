package codesquad.fineants.domain.oauth.response;

import codesquad.fineants.domain.jwt.Jwt;
import codesquad.fineants.domain.member.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class OauthMemberLoginResponse {

	private Jwt jwt;
	private OauthLoginMemberResponse user;

	public static OauthMemberLoginResponse of(Jwt jwt, Member member) {
		OauthLoginMemberResponse user = OauthLoginMemberResponse.from(member);
		return new OauthMemberLoginResponse(jwt, user);
	}

	@Override
	public String toString() {
		return String.format("%s, %s(user=%s)", "소셜 로그인 응답", this.getClass().getSimpleName(), user);
	}
}
