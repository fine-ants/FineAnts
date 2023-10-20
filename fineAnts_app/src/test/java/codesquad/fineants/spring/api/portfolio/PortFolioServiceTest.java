package codesquad.fineants.spring.api.portfolio;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import codesquad.fineants.domain.member.Member;
import codesquad.fineants.domain.member.MemberRepository;
import codesquad.fineants.domain.oauth.support.AuthMember;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio.PortfolioRepository;
import codesquad.fineants.spring.api.errors.exception.BadRequestException;
import codesquad.fineants.spring.api.errors.exception.ConflictException;
import codesquad.fineants.spring.api.portfolio.request.PortfolioCreateRequest;
import codesquad.fineants.spring.api.portfolio.response.PortFolioCreateResponse;

@SpringBootTest
class PortFolioServiceTest {
	@Autowired
	private PortFolioService service;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private PortfolioRepository portfolioRepository;

	private Member member;

	@BeforeEach
	void init() {
		Member member = Member.builder()
			.nickname("일개미1234")
			.email("kim1234@gmail.com")
			.password("kim1234@")
			.provider("local")
			.build();
		this.member = memberRepository.save(member);
	}

	@AfterEach
	void tearDown() {
		portfolioRepository.deleteAllInBatch();
		memberRepository.deleteAllInBatch();
	}

	@DisplayName("회원이 포트폴리오를 추가한다")
	@Test
	void addPortfolio() throws JsonProcessingException {
		// given
		Map<String, Object> body = new HashMap<>();
		body.put("name", "내꿈은 워렌버핏");
		body.put("securitiesFirm", "토스");
		body.put("budget", 1000000L);
		body.put("targetGain", 1500000L);
		body.put("maximumLoss", 900000L);

		PortfolioCreateRequest request = objectMapper.readValue(objectMapper.writeValueAsString(body),
			PortfolioCreateRequest.class);

		// when
		PortFolioCreateResponse response = service.addPortFolio(request, AuthMember.from(member));

		// then
		assertAll(
			() -> assertThat(response).isNotNull(),
			() -> assertThat(response)
				.extracting("name")
				.isEqualTo("내꿈은 워렌버핏")
		);
	}

	@DisplayName("회원은 포트폴리오를 추가할때 목표수익금액이 예산보다 같거나 작으면 안된다")
	@MethodSource("provideInvalidTargetGain")
	@ParameterizedTest
	void addPortfolioWithTargetGainIsEqualLessThanBudget(Long targetGain) throws JsonProcessingException {
		// given
		Map<String, Object> body = new HashMap<>();
		body.put("name", "내꿈은 워렌버핏");
		body.put("securitiesFirm", "토스");
		body.put("budget", 1000000L);
		body.put("targetGain", targetGain);
		body.put("maximumLoss", 900000L);

		PortfolioCreateRequest request = objectMapper.readValue(objectMapper.writeValueAsString(body),
			PortfolioCreateRequest.class);

		// when
		Throwable throwable = catchThrowable(() -> service.addPortFolio(request, AuthMember.from(member)));

		// then
		assertThat(throwable)
			.isInstanceOf(BadRequestException.class)
			.extracting("message")
			.isEqualTo("목표 수익금액은 예산보다 커야 합니다");
	}

	private static Stream<Arguments> provideInvalidTargetGain() {
		return Stream.of(
			Arguments.of(900000L),
			Arguments.of(1000000L)
		);
	}

	@DisplayName("회원은 포트폴리오를 추가할때 최대손실율이 예산보다 같거나 크면 안된다")
	@MethodSource("provideInvalidMaximumLoss")
	@ParameterizedTest
	void addPortfolioWithMaximumLossIsEqualGreaterThanBudget(Long maximumLoss) throws JsonProcessingException {
		// given
		Map<String, Object> body = new HashMap<>();
		body.put("name", "내꿈은 워렌버핏");
		body.put("securitiesFirm", "토스");
		body.put("budget", 1000000L);
		body.put("targetGain", 1500000L);
		body.put("maximumLoss", maximumLoss);

		PortfolioCreateRequest request = objectMapper.readValue(objectMapper.writeValueAsString(body),
			PortfolioCreateRequest.class);

		// when
		Throwable throwable = catchThrowable(() -> service.addPortFolio(request, AuthMember.from(member)));

		// then
		assertThat(throwable)
			.isInstanceOf(BadRequestException.class)
			.extracting("message")
			.isEqualTo("최대 손실 금액은 예산 보다 작아야 합니다");
	}

	private static Stream<Arguments> provideInvalidMaximumLoss() {
		return Stream.of(
			Arguments.of(1000000L),
			Arguments.of(1100000L)
		);
	}

	@DisplayName("회원은 내가 가지고 있는 포트폴리오들중에서 동일한 이름을 가지는 포트폴리오를 추가할 수는 없다")
	@Test
	void addPortfolioWithDuplicateName() throws JsonProcessingException {
		// given
		portfolioRepository.save(Portfolio.builder()
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

		Map<String, Object> body = new HashMap<>();
		body.put("name", "내꿈은 워렌버핏");
		body.put("securitiesFirm", "토스");
		body.put("budget", 1000000L);
		body.put("targetGain", 1500000L);
		body.put("maximumLoss", 900000L);

		PortfolioCreateRequest request = objectMapper.readValue(objectMapper.writeValueAsString(body),
			PortfolioCreateRequest.class);

		// when
		Throwable throwable = catchThrowable(() -> service.addPortFolio(request, AuthMember.from(member)));

		// then
		assertThat(throwable)
			.isInstanceOf(ConflictException.class)
			.extracting("message")
			.isEqualTo("포트폴리오 이름이 중복되었습니다");
	}

}
