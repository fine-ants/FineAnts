package codesquad.fineants.spring.api.member.controller;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codesquad.fineants.domain.oauth.response.OauthMemberLoginResponse;
import codesquad.fineants.spring.api.member.service.MemberService;
import codesquad.fineants.spring.api.response.ApiResponse;
import codesquad.fineants.spring.api.success.code.OauthSuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping(path = "/api/auth")
@RestController
public class MemberRestController {

	private final MemberService memberService;

	@PostMapping(value = "/{provider}/login")
	public ApiResponse<OauthMemberLoginResponse> login(
		@PathVariable String provider,
		@RequestParam String code,
		@RequestParam(value = "redirectUrl", required = false) String redirectUrl) {
		OauthMemberLoginResponse response = memberService.login(provider, code, LocalDateTime.now(), redirectUrl);
		return ApiResponse.success(OauthSuccessCode.OK_LOGIN, response);
	}

}
