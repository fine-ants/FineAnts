package codesquad.fineants.spring.api.portfolio.response;

import java.time.LocalDateTime;

import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio_gain_history.PortfolioGainHistory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PortFolioItem {
	private Long id;
	private String name;
	private Long budget;
	private Long totalGain;
	private Double totalReturnRate;
	private Long dailyGain;
	private Double dailyReturnRate;
	private Long expectedMonthlyDividend;
	private Integer numShares;

	@Builder(access = AccessLevel.PRIVATE)
	private PortFolioItem(Long id, String name, Long budget, Long totalGain, Double totalReturnRate, Long dailyGain,
		Double dailyReturnRate, Long expectedMonthlyDividend, Integer numShares) {
		this.id = id;
		this.name = name;
		this.budget = budget;
		this.totalGain = totalGain;
		this.totalReturnRate = totalReturnRate;
		this.dailyGain = dailyGain;
		this.dailyReturnRate = dailyReturnRate;
		this.expectedMonthlyDividend = expectedMonthlyDividend;
		this.numShares = numShares;
	}

	public static PortFolioItem of(Portfolio portfolio, PortfolioGainHistory prevHistory) {
		return PortFolioItem.builder()
			.id(portfolio.getId())
			.name(portfolio.getName())
			.budget(portfolio.getBudget())
			.totalGain(portfolio.calculateTotalGain())
			.totalReturnRate(portfolio.calculateTotalReturnRate())
			.dailyGain(portfolio.calculateDailyGain(prevHistory))
			.dailyReturnRate(portfolio.calculateDailyReturnRate(prevHistory))
			.expectedMonthlyDividend(portfolio.calculateExpectedMonthlyDividend(LocalDateTime.now()))
			.numShares(portfolio.getNumberOfShares())
			.build();
	}
}
