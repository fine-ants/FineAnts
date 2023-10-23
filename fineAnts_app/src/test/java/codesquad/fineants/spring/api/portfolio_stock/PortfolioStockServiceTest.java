package codesquad.fineants.spring.api.portfolio_stock;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import codesquad.fineants.domain.member.Member;
import codesquad.fineants.domain.member.MemberRepository;
import codesquad.fineants.domain.oauth.support.AuthMember;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio.PortfolioRepository;
import codesquad.fineants.domain.portfolio_stock.PortFolioStockRepository;
import codesquad.fineants.domain.portfolio_stock.PortfolioStock;
import codesquad.fineants.domain.stock.Market;
import codesquad.fineants.domain.stock.Stock;
import codesquad.fineants.domain.stock.StockRepository;
import codesquad.fineants.domain.trade_history.TradeHistory;
import codesquad.fineants.domain.trade_history.TradeHistoryRepository;
import codesquad.fineants.spring.api.errors.exception.NotFoundResourceException;
import codesquad.fineants.spring.api.portfolio_stock.request.PortfolioStockCreateRequest;
import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioStockCreateResponse;
import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioStockDeleteResponse;

@ActiveProfiles("test")
@SpringBootTest
class PortfolioStockServiceTest {
	@Autowired
	private PortfolioStockService portfolioStockService;

	@Autowired
	private PortFolioStockRepository portFolioStockRepository;

	@Autowired
	private PortfolioRepository portfolioRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private StockRepository stockRepository;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private TradeHistoryRepository tradeHistoryRepository;

	private Member member;

	private Portfolio portfolio;

	private Stock stock;

	@BeforeEach
	void init() {
		Member member = Member.builder()
			.nickname("일개미1234")
			.email("kim1234@gmail.com")
			.password("kim1234@")
			.provider("local")
			.build();
		this.member = memberRepository.save(member);

		Portfolio portfolio = Portfolio.builder()
			.name("내꿈은 워렌버핏")
			.securitiesFirm("토스")
			.budget(1000000L)
			.targetGain(1500000L)
			.maximumLoss(900000L)
			.member(member)
			.build();
		this.portfolio = portfolioRepository.save(portfolio);

		Stock stock = Stock.builder()
			.companyName("삼성전자보통주")
			.tickerSymbol("005930")
			.engCompanyName("SamsungElectronics")
			.stockcode("KR7005930003")
			.market(Market.KOSPI)
			.build();
		this.stock = stockRepository.save(stock);
	}

	@AfterEach
	void tearDown() {
		tradeHistoryRepository.deleteAllInBatch();
		portFolioStockRepository.deleteAllInBatch();
		portfolioRepository.deleteAllInBatch();
		memberRepository.deleteAllInBatch();
		stockRepository.deleteAllInBatch();
	}

	@DisplayName("사용자는 포트폴리오에 종목을 추가한다")
	@Test
	void addPortfolioStock() throws JsonProcessingException {
		// given
		Long portfolioId = portfolio.getId();
		Map<String, Object> requestBodyMap = new HashMap<>();
		requestBodyMap.put("stockId", stock.getId());
		PortfolioStockCreateRequest request = objectMapper.readValue(
			objectMapper.writeValueAsString(requestBodyMap), PortfolioStockCreateRequest.class);

		// when
		PortfolioStockCreateResponse response = portfolioStockService.addPortfolioStock(portfolioId,
			request, AuthMember.from(member));

		// then
		assertAll(
			() -> assertThat(response)
				.extracting("portfolioStockId")
				.isNotNull(),
			() -> assertThat(portFolioStockRepository.findAll()).hasSize(1)
		);
	}

	@DisplayName("사용자는 포트폴리오에 존재하지 않는 종목을 추가할 수 없다")
	@Test
	void addPortfolioStockWithNotExistStock() throws JsonProcessingException {
		// given
		Long portfolioId = portfolio.getId();
		Map<String, Object> requestBodyMap = new HashMap<>();
		requestBodyMap.put("stockId", 9999L);
		PortfolioStockCreateRequest request = objectMapper.readValue(
			objectMapper.writeValueAsString(requestBodyMap), PortfolioStockCreateRequest.class);

		// when
		Throwable throwable = catchThrowable(() -> portfolioStockService.addPortfolioStock(portfolioId,
			request, AuthMember.from(member)));

		// then
		assertThat(throwable).isInstanceOf(NotFoundResourceException.class)
			.extracting("message")
			.isEqualTo("종목을 찾을 수 없습니다");
	}

	@DisplayName("사용자는 포트폴리오의 종목을 삭제한다")
	@Test
	void deletePortfolioStock() {
		// given
		PortfolioStock portfolioStock = portFolioStockRepository.save(
			PortfolioStock.empty(portfolio, stock)
		);

		tradeHistoryRepository.save(
			TradeHistory.builder()
				.purchaseDate(LocalDateTime.now())
				.purchasePricePerShare(10000L)
				.numShares(1L)
				.memo("첫구매")
				.build()
		);

		Long portfolioStockId = portfolioStock.getId();
		// when
		PortfolioStockDeleteResponse response = portfolioStockService.deletePortfolioStock(
			portfolioStockId, portfolio.getId(), AuthMember.from(member));

		// then
		assertAll(
			() -> assertThat(response).extracting("portfolioStockId").isNotNull(),
			() -> assertThat(portFolioStockRepository.findById(portfolioStockId).isEmpty()).isTrue(),
			() -> assertThat(tradeHistoryRepository.findAllByPortFolioStockId(portfolioStockId)).isEmpty()
		);
	}

	@DisplayName("사용자는 존재하지 않은 포트폴리오의 종목을 삭제할 수 없다")
	@Test
	void deletePortfolioStockWithNotExistPortfolioStockId() {
		// given
		Long portfolioStockId = 9999L;

		// when
		Throwable throwable = catchThrowable(() -> portfolioStockService.deletePortfolioStock(
			portfolioStockId, portfolio.getId(), AuthMember.from(member)));

		// then
		assertThat(throwable).isInstanceOf(NotFoundResourceException.class).extracting("message")
			.isEqualTo("포트폴리오 종목이 존재하지 않습니다");
	}
}
