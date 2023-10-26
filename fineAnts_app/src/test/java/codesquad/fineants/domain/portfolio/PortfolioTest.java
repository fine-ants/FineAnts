package codesquad.fineants.domain.portfolio;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import codesquad.fineants.domain.portfolio_holding.PortfolioHolding;
import codesquad.fineants.domain.purchase_history.PurchaseHistory;
import codesquad.fineants.domain.stock.Market;
import codesquad.fineants.domain.stock.Stock;
import codesquad.fineants.domain.stock_dividend.StockDividend;

@ActiveProfiles("test")
class PortfolioTest {

	@DisplayName("포트폴리오의 총 손익을 계산한다")
	@Test
	void calculateTotalGain() {
		// given
		PortfolioHolding portFolioHolding = PortfolioHolding.builder()
			.numShares(10L)
			.currentPrice(20000L)
			.build();

		PurchaseHistory purchaseHistory1 = PurchaseHistory.builder()
			.purchaseDate(LocalDateTime.now())
			.numShares(5L)
			.purchasePricePerShare(10000L)
			.build();

		PurchaseHistory purchaseHistory2 = PurchaseHistory.builder()
			.purchaseDate(LocalDateTime.now())
			.numShares(5L)
			.purchasePricePerShare(10000L)
			.build();

		portFolioHolding.addTradeHistory(purchaseHistory1);
		portFolioHolding.addTradeHistory(purchaseHistory2);

		Portfolio portfolio = Portfolio.builder()
			.budget(1000000L)
			.targetGain(1500000L)
			.maximumLoss(900000L)
			.build();

		portfolio.addPortfolioStock(portFolioHolding);

		// when
		Long result = portfolio.calculateTotalGain();

		// then
		assertThat(result).isEqualTo(100000L);
	}

	@DisplayName("포트폴리오의 총 손익율 계산한다")
	@Test
	void calculateTotalReturnRate() {
		// given
		PortfolioHolding portFolioHolding = PortfolioHolding.builder()
			.numShares(10L)
			.currentPrice(20000L)
			.build();

		PurchaseHistory purchaseHistory1 = PurchaseHistory.builder()
			.purchaseDate(LocalDateTime.now())
			.numShares(5L)
			.purchasePricePerShare(10000L)
			.build();

		PurchaseHistory purchaseHistory2 = PurchaseHistory.builder()
			.purchaseDate(LocalDateTime.now())
			.numShares(5L)
			.purchasePricePerShare(10000L)
			.build();

		portFolioHolding.addTradeHistory(purchaseHistory1);
		portFolioHolding.addTradeHistory(purchaseHistory2);

		Portfolio portfolio = Portfolio.builder()
			.budget(1000000L)
			.targetGain(1500000L)
			.maximumLoss(900000L)
			.build();

		portfolio.addPortfolioStock(portFolioHolding);

		// when
		Integer result = portfolio.calculateTotalGainRate();

		// then
		assertThat(result).isEqualTo(100);
	}

	@DisplayName("포트폴리오의 당월 예상 배당을 계산한다")
	@Test
	void calculateExpectedMonthlyDividend() {
		// given
		Stock stock = Stock.builder()
			.id(1L)
			.companyName("삼성전자")
			.companyNameEng("SamsungElectronics")
			.stockCode("KR7001360007")
			.tickerSymbol("005930")
			.market(Market.KOSPI)
			.build();

		StockDividend stockDividend1 = StockDividend.builder()
			.id(1L)
			.dividend(1000L)
			.dividendMonths(LocalDate.of(2023, 3, 1).atStartOfDay())
			.build();

		StockDividend stockDividend2 = StockDividend.builder()
			.id(1L)
			.dividend(1000L)
			.dividendMonths(LocalDate.of(2023, 6, 1).atStartOfDay())
			.build();

		StockDividend stockDividend3 = StockDividend.builder()
			.id(1L)
			.dividend(1000L)
			.dividendMonths(LocalDate.of(2023, 10, 1).atStartOfDay())
			.build();

		StockDividend stockDividend4 = StockDividend.builder()
			.id(1L)
			.dividend(1000L)
			.dividendMonths(LocalDate.of(2023, 12, 1).atStartOfDay())
			.build();

		stock.addStockDividend(stockDividend1);
		stock.addStockDividend(stockDividend2);
		stock.addStockDividend(stockDividend3);
		stock.addStockDividend(stockDividend4);

		PortfolioHolding portFolioHolding = PortfolioHolding.builder()
			.numShares(10L)
			.currentPrice(20000L)
			.stock(stock)
			.build();

		PurchaseHistory purchaseHistory1 = PurchaseHistory.builder()
			.purchaseDate(LocalDateTime.now())
			.numShares(5L)
			.purchasePricePerShare(10000L)
			.portFolioHolding(portFolioHolding)
			.build();

		PurchaseHistory purchaseHistory2 = PurchaseHistory.builder()
			.purchaseDate(LocalDateTime.now())
			.numShares(5L)
			.purchasePricePerShare(10000L)
			.portFolioHolding(portFolioHolding)
			.build();

		portFolioHolding.addTradeHistory(purchaseHistory1);
		portFolioHolding.addTradeHistory(purchaseHistory2);

		Portfolio portfolio = Portfolio.builder()
			.budget(1000000L)
			.targetGain(1500000L)
			.maximumLoss(900000L)
			.build();

		portfolio.addPortfolioStock(portFolioHolding);

		// when
		Long result = portfolio.calculateExpectedMonthlyDividend(LocalDate.of(2023, 10, 22).atStartOfDay());

		// then
		assertThat(result).isEqualTo(10000L);
	}
}
