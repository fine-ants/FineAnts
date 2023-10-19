package codesquad.fineants.domain.portfolio;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import codesquad.fineants.domain.member.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Portfolio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String securitiesFirm;
	private Long budget;
	private Long targetGain;
	private Long maximumLoss;
	private Long investedAmount;
	private Long balance;
	private Long totalAnnualDividend;
	private Long annualInvestmentDividend;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Builder
	public Portfolio(Long id, String name, String securitiesFirm, Long budget, Long targetGain, Long maximumLoss,
		Long investedAmount, Long balance, Long totalAnnualDividend, Long annualInvestmentDividend, Member member) {
		this.id = id;
		this.name = name;
		this.securitiesFirm = securitiesFirm;
		this.budget = budget;
		this.targetGain = targetGain;
		this.maximumLoss = maximumLoss;
		this.investedAmount = investedAmount;
		this.balance = balance;
		this.totalAnnualDividend = totalAnnualDividend;
		this.annualInvestmentDividend = annualInvestmentDividend;
		this.member = member;
	}
}
