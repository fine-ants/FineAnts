package codesquad.fineants.spring.api.portfolio.response;

import codesquad.fineants.domain.portfolio.Portfolio;
import lombok.AccessLevel;
import lombok.Builder;

public class PortFolioItem {
	private Long id;
	private String name;
	private Long budget;
	private Long totalGain;
	private Double totalReturnRate;
	private Long dailyGain;
	private Double dailyReturnRate;
	private Long expectedMonthlyDividend;
	private Integer numberOfShares;

	@Builder(access = AccessLevel.PRIVATE)
	private PortFolioItem(Long id, String name, Long budget, Long totalGain, Double totalReturnRate, Long dailyGain,
		Double dailyReturnRate, Long expectedMonthlyDividend, Integer numberOfShares) {
		this.id = id;
		this.name = name;
		this.budget = budget;
		this.totalGain = totalGain;
		this.totalReturnRate = totalReturnRate;
		this.dailyGain = dailyGain;
		this.dailyReturnRate = dailyReturnRate;
		this.expectedMonthlyDividend = expectedMonthlyDividend;
		this.numberOfShares = numberOfShares;
	}

	public static PortFolioItem from(Portfolio portfolio) {
		return PortFolioItem.builder()
			.id(portfolio.getId())
			.name(portfolio.getName())
			.budget(portfolio.getBudget())
			.totalGain(portfolio.calculateTotalGain())
			.totalReturnRate(0.0)
			.dailyGain(0L)
			.dailyReturnRate(0.0)
			.expectedMonthlyDividend(0L)
			.numberOfShares(0)
			.build();
	}
}
