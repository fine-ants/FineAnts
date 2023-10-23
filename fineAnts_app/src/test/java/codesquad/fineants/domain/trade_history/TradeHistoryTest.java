package codesquad.fineants.domain.trade_history;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TradeHistoryTest {

	@DisplayName("매입 내역의 투자 금액을 구한다")
	@Test
	void calculateInvestmentAmount() {
		// given
		TradeHistory tradeHistory = TradeHistory.builder()
			.purchaseDate(LocalDateTime.now())
			.numShares(5L)
			.purchasePricePerShare(10000L)
			.build();

		// when
		long result = tradeHistory.calculateInvestmentAmount();

		// then
		assertThat(result).isEqualTo(50000L);
	}

}
