package codesquad.fineants.spring.api.member.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import codesquad.fineants.domain.jwt.Jwt;
import codesquad.fineants.domain.jwt.JwtProvider;
import codesquad.fineants.domain.member.Member;
import codesquad.fineants.domain.member.MemberRepository;
import codesquad.fineants.spring.api.oauth.client.OauthClient;
import codesquad.fineants.spring.api.oauth.repository.OauthClientRepository;
import codesquad.fineants.spring.api.oauth.response.OauthAccessTokenResponse;
import codesquad.fineants.spring.api.oauth.response.OauthMemberLoginResponse;
import codesquad.fineants.spring.api.oauth.response.OauthUserProfileResponse;
import codesquad.fineants.spring.api.redis.OauthMemberRedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {
	private final OauthClientRepository oauthClientRepository;
	private final MemberRepository memberRepository;
	private final JwtProvider jwtProvider;
	private final OauthMemberRedisService oauthMemberRedisService;

	public OauthMemberLoginResponse login(String provider, String code, LocalDateTime now, String redirectUrl) {
		log.info("provider : {}, code : {}", provider, code);

		OauthUserProfileResponse userProfileResponse = getOauthUserProfileResponse(provider, code, redirectUrl);

		Optional<Member> optionalMember = getLoginMember(provider, userProfileResponse);

		Member member = optionalMember.orElseGet(() -> {
			Member newMember = Member.builder()
				.email(userProfileResponse.getEmail())
				.nickname("일개미1234")
				.provider(provider)
				.profileUrl(userProfileResponse.getProfileImage())
				.build();
			memberRepository.save(newMember);
			return newMember;
		});

		Jwt jwt = jwtProvider.createJwtBasedOnMember(member, now);
		log.debug("로그인 서비스 요청 중 jwt 객체 생성 : {}", jwt);

		oauthMemberRedisService.saveRefreshToken(member.createRedisKey(), jwt);

		return OauthMemberLoginResponse.of(jwt, member);
	}

	private OauthUserProfileResponse getOauthUserProfileResponse(String provider, String authorizationCode,
		String redirectUrl) {
		OauthClient oauthClient = oauthClientRepository.findOneBy(provider);

		OauthAccessTokenResponse accessTokenResponse =
			oauthClient.exchangeAccessTokenByAuthorizationCode(authorizationCode, redirectUrl);
		log.debug("{}", accessTokenResponse);

		OauthUserProfileResponse userProfileResponse =
			oauthClient.getUserProfileByAccessToken(accessTokenResponse);
		log.debug("{}", userProfileResponse);
		return userProfileResponse;
	}

	private Optional<Member> getLoginMember(String provider, OauthUserProfileResponse userProfileResponse) {
		String email = userProfileResponse.getEmail();
		return memberRepository.findMemberByEmailAAndProvider(email, provider);
	}
}
