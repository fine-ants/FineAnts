package codesquad.fineants.domain.portfolio_holding;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import codesquad.fineants.domain.purchase_history.PurchaseHistory;

class PortfolioHoldingTest {

	@DisplayName("한 종목의 총 투자 금액을 계산한다")
	@Test
	void calculateTotalInvestmentAmount() {
		// given
		PortfolioHolding portFolioHolding = PortfolioHolding.builder()
			.numShares(10L)
			.currentPrice(10000L)
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

		// when
		long result = portFolioHolding.calculateTotalInvestmentAmount();

		// then
		assertThat(result).isEqualTo(100000L);
	}

	@DisplayName("한 종목의 평균 매입가를 계산한다")
	@Test
	void calculateAverageCostPerShare() {
		// given
		PortfolioHolding portFolioHolding = PortfolioHolding.builder()
			.numShares(10L)
			.currentPrice(10000L)
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

		// when
		Double result = portFolioHolding.calculateAverageCostPerShare();

		// then
		assertThat(result).isEqualTo(10000.0);
	}

	@DisplayName("한 종목의 총 손익을 계산한다")
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

		// when
		long result = portFolioHolding.calculateTotalGain();

		// then
		assertThat(result).isEqualTo(100000L);
	}

	@DisplayName("한 종목의 총 손익율 계산한다")
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

		// when
		double result = portFolioHolding.calculateTotalReturnRate();

		// then
		assertThat(result).isEqualTo(100.0);
	}

}
