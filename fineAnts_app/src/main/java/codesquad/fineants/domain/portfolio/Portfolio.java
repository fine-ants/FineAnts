package codesquad.fineants.domain.portfolio;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import codesquad.fineants.domain.member.Member;
import codesquad.fineants.domain.portfolio_stock.PortFolioStock;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"member", "portFolioStocks"})
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

	@OneToMany(mappedBy = "portfolio")
	private List<PortFolioStock> portFolioStocks;

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

	public Long calculateTotalGain() {
		return portFolioStocks.stream()
			.mapToLong(PortFolioStock::getTotalGain)
			.sum();
	}

	public void change(Portfolio changePortfolio) {
		this.name = changePortfolio.name;
		this.securitiesFirm = changePortfolio.securitiesFirm;
		this.budget = changePortfolio.budget;
		this.targetGain = changePortfolio.targetGain;
		this.maximumLoss = changePortfolio.maximumLoss;
	}

	public boolean hasAuthorization(Long memberId) {
		return member.getId().equals(memberId);
	}
}
