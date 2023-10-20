package codesquad.fineants.spring.api.portfolio.request;

import codesquad.fineants.domain.member.Member;
import codesquad.fineants.domain.portfolio.Portfolio;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfolioCreateRequest {
	private String name;
	private String securitiesFirm;
	private Long budget;
	private Long targetGain;
	private Long maximumLoss;

	public Portfolio toEntity(Member member) {
		return Portfolio.builder()
			.name(name)
			.securitiesFirm(securitiesFirm)
			.budget(budget)
			.targetGain(targetGain)
			.maximumLoss(maximumLoss)
			.investedAmount(0L)
			.balance(budget)
			.totalAnnualDividend(0L)
			.annualInvestmentDividend(0L)
			.member(member)
			.build();
	}
}
