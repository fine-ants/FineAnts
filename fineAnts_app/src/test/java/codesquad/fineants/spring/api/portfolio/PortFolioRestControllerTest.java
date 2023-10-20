package codesquad.fineants.spring.api.portfolio;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import codesquad.fineants.domain.member.Member;
import codesquad.fineants.domain.oauth.support.AuthMember;
import codesquad.fineants.domain.oauth.support.AuthPrincipalArgumentResolver;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.spring.api.errors.handler.GlobalExceptionHandler;
import codesquad.fineants.spring.api.portfolio.request.PortfolioCreateRequest;
import codesquad.fineants.spring.api.portfolio.response.PortFolioCreateResponse;
import codesquad.fineants.spring.config.JpaAuditingConfiguration;

@ActiveProfiles("test")
@WebMvcTest(controllers = PortFolioRestController.class)
@MockBean(JpaAuditingConfiguration.class)
class PortFolioRestControllerTest {

	private MockMvc mockMvc;

	@Autowired
	private PortFolioRestController portFolioRestController;

	@Autowired
	private GlobalExceptionHandler globalExceptionHandler;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private AuthPrincipalArgumentResolver authPrincipalArgumentResolver;

	@MockBean
	private PortFolioService portFolioService;

	private Member member;

	@BeforeEach
	void setup() {
		mockMvc = MockMvcBuilders.standaloneSetup(portFolioRestController)
			.setControllerAdvice(globalExceptionHandler)
			.setCustomArgumentResolvers(authPrincipalArgumentResolver)
			.alwaysDo(print())
			.build();

		given(authPrincipalArgumentResolver.supportsParameter(any())).willReturn(true);

		member = Member.builder()
			.id(1L)
			.nickname("일개미1234")
			.email("kim1234@gmail.com")
			.provider("local")
			.password("kim1234@")
			.profileUrl("profileValue")
			.build();

		AuthMember authMember = AuthMember.from(member);

		given(authPrincipalArgumentResolver.resolveArgument(any(), any(), any(), any())).willReturn(authMember);
	}

	@DisplayName("사용자는 포트폴리오 추가를 요청한다")
	@Test
	void addPortfolio() throws Exception {
		// given
		PortFolioCreateResponse response = PortFolioCreateResponse.from(Portfolio.builder()
			.name("내꿈은 워렌버핏")
			.securitiesFirm("토스")
			.budget(1000000L)
			.targetGain(1500000L)
			.maximumLoss(900000L)
			.investedAmount(0L)
			.balance(1000000L)
			.totalAnnualDividend(0L)
			.annualInvestmentDividend(0L)
			.member(member)
			.build());
		given(portFolioService.addPortFolio(any(PortfolioCreateRequest.class), any(AuthMember.class)))
			.willReturn(response);

		Map<String, Object> requestBodyMap = new HashMap<>();
		requestBodyMap.put("name", "내꿈은 워렌버핏");
		requestBodyMap.put("securitiesFirm", "토스");
		requestBodyMap.put("budget", 1000000L);
		requestBodyMap.put("targetGain", 1500000L);
		requestBodyMap.put("maximumLoss", 900000L);

		String body = objectMapper.writeValueAsString(requestBodyMap);
		// when & then
		mockMvc.perform(post("/api/portfolios")
				.contentType(MediaType.APPLICATION_JSON)
				.content(body))
			.andExpect(status().isCreated())
			.andExpect(jsonPath("code").value(equalTo(201)))
			.andExpect(jsonPath("status").value(equalTo("Created")))
			.andExpect(jsonPath("message").value(equalTo("포트폴리오가 추가되었습니다")))
			.andExpect(jsonPath("data").value(equalTo(null)));
	}
}
