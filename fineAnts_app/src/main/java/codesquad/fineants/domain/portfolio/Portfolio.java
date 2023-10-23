package codesquad.fineants.domain.portfolio;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
import codesquad.fineants.domain.portfolio_gain_history.PortfolioGainHistory;
import codesquad.fineants.domain.portfolio_stock.PortfolioStock;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"member", "portfolioStocks"})
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "portfolio")
	private final List<PortfolioStock> portfolioStocks = new ArrayList<>();

	@Builder
	public Portfolio(Long id, String name, String securitiesFirm, Long budget, Long targetGain, Long maximumLoss,
		Member member) {
		this.id = id;
		this.name = name;
		this.securitiesFirm = securitiesFirm;
		this.budget = budget;
		this.targetGain = targetGain;
		this.maximumLoss = maximumLoss;
		this.member = member;
	}

	//== 연관관계 메소드 ==//
	public void addPortfolioStock(PortfolioStock portFolioStock) {
		if (!portfolioStocks.contains(portFolioStock)) {
			portfolioStocks.add(portFolioStock);
		}
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

	// 포트폴리오 총 손익 = 모든 종목 총 손옥의 합계
	// 종목 총 손익 = (종목 현재가 - 종목 평균 매입가) * 개수
	// 종목 평균 매입가 = 종목의 총 투자 금액 / 총 주식 개수
	public Long calculateTotalGain() {
		return portfolioStocks.stream()
			.mapToLong(PortfolioStock::calculateTotalGain)
			.sum();
	}

	// 포트폴리오 총 손익율 = (포트폴리오 총 손익 / 포트폴리오 총 투자 금액)
	public Double calculateTotalReturnRate() {
		Long totalInvestmentAmount = calculateTotalInvestmentAmount();
		if (totalInvestmentAmount == 0) {
			return 0.0;
		}
		return (double)(calculateTotalGain() / totalInvestmentAmount);
	}

	// 포트폴리오 총 투자 금액 = 각 종목들의 구입가들의 합계
	private Long calculateTotalInvestmentAmount() {
		return portfolioStocks.stream()
			.mapToLong(PortfolioStock::calculateTotalInvestmentAmount)
			.sum();
	}

	// 포트폴리오 당일 손익 = 모든 종목들의 평가 금액 합계 - 이전일 포트폴리오의 모든 종목들의 평가 금액 합계
	public Long calculateDailyGain(PortfolioGainHistory previousHistory) {
		return calculateTotalCurrentValue() - previousHistory.getCurrentValue();
	}

	// 포트폴리오 평가 금액(현재 가치) = 모든 종목들의 평가금액 합계
	private Long calculateTotalCurrentValue() {
		return portfolioStocks.stream()
			.mapToLong(PortfolioStock::calculateCurrentValue)
			.sum();
	}

	// 포트폴리오 당일 손익율 = (당일 포트폴리오 가치 총합 - 이전 포트폴리오 가치 총합) / 이전 포트폴리오 가치 총합
	public Double calculateDailyReturnRate(PortfolioGainHistory prevHistory) {
		Long currentValue = prevHistory.getCurrentValue();
		if (currentValue == 0) {
			return 0.0;
		}
		return (double)((calculateTotalCurrentValue() - prevHistory.getCurrentValue()) / currentValue);
	}

	// 포트폴리오 당월 예상 배당금 = 각 종목들에 해당월의 배당금 합계
	public Long calculateExpectedMonthlyDividend(LocalDateTime monthDateTime) {
		return portfolioStocks.stream()
			.filter(portFolioStock -> portFolioStock.hasMonthlyDividend(monthDateTime))
			.mapToLong(portFolioStock -> portFolioStock.readDividend(monthDateTime))
			.findAny().orElse(0L);
	}

	public Integer getNumberOfShares() {
		return portfolioStocks.size();
	}
}
