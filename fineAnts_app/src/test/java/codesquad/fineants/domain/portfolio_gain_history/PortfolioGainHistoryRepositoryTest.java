package codesquad.fineants.domain.portfolio_gain_history;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
class PortfolioGainHistoryRepositoryTest {

	@Autowired
	private PortfolioGainHistoryRepository repository;

	@DisplayName("주어진 날짜보다 같거나 작은 데이터들중 가장 최근의 데이터를 한개 조회한다")
	@Test
	void findFirstByCreateAtIsLessThanEqualOrderByCreateAtDesc() {
		// given
		PortfolioGainHistory portfolioGainHistory1 = PortfolioGainHistory.builder()
			.totalGain(10000L)
			.dailyGain(10000L)
			.currentValue(110000L)
			.build();
		PortfolioGainHistory portfolioGainHistory2 = PortfolioGainHistory.builder()
			.totalGain(20000L)
			.dailyGain(10000L)
			.currentValue(120000L)
			.build();
		repository.save(portfolioGainHistory1);
		repository.save(portfolioGainHistory2);

		// when
		PortfolioGainHistory result = repository.findFirstByCreateAtIsLessThanEqualOrderByCreateAtDesc(
				LocalDateTime.now())
			.orElseThrow();
		// then

		assertThat(result).extracting("currentValue").isEqualTo(120000L);

	}

}
