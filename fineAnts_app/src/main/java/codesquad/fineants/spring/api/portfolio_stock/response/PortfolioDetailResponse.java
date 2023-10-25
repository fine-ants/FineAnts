package codesquad.fineants.spring.api.portfolio_stock.response;

import codesquad.fineants.domain.portfolio.Portfolio;
import lombok.Builder;

public class PortfolioDetailResponse {
	private Long id;
	private String name;
	private Long budget;
	private Long targetGain;
	private Integer targetReturnRate;
	private Long maximumLoss;
	private Integer maximumLossRate;
	private Long investedAmount;
	private Long totalGain;
	private Integer totalGainRate;
	private Long dailyGain;
	private Integer dailyGainRate;
	private Long balance;
	private Long totalAnnualDividend;
	private Integer totalAnnualDividendYield;
	private Integer annualInvestmentDividendYield;
	private Long provisionalLossBalance;

	@Builder
	public PortfolioDetailResponse(Long id, String name, Long budget, Long targetGain, Integer targetReturnRate,
		Long maximumLoss, Integer maximumLossRate, Long investedAmount, Long totalGain, Integer totalGainRate,
		Long dailyGain, Integer dailyGainRate, Long balance, Long totalAnnualDividend, Integer totalAnnualDividendYield,
		Integer annualInvestmentDividendYield, Long provisionalLossBalance) {
		this.id = id;
		this.name = name;
		this.budget = budget;
		this.targetGain = targetGain;
		this.targetReturnRate = targetReturnRate;
		this.maximumLoss = maximumLoss;
		this.maximumLossRate = maximumLossRate;
		this.investedAmount = investedAmount;
		this.totalGain = totalGain;
		this.totalGainRate = totalGainRate;
		this.dailyGain = dailyGain;
		this.dailyGainRate = dailyGainRate;
		this.balance = balance;
		this.totalAnnualDividend = totalAnnualDividend;
		this.totalAnnualDividendYield = totalAnnualDividendYield;
		this.annualInvestmentDividendYield = annualInvestmentDividendYield;
		this.provisionalLossBalance = provisionalLossBalance;
	}

	public static PortfolioDetailResponse from(Portfolio portfolio) {
		return null;
	}
}

