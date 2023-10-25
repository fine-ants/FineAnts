package codesquad.fineants.domain.portfolio_stock;

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

import codesquad.fineants.domain.BaseEntity;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.stock.Stock;
import codesquad.fineants.domain.trade_history.TradeHistory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PortfolioHolding extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long numShares;    // 주식 개수
	private Long annualDividend;    // 연간배당금
	private Long currentPrice;      // 현재가

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "portfolio_id")
	private Portfolio portfolio;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "stock_id")
	private Stock stock;

	@Builder
	public PortfolioHolding(Long id, Long numShares, Long annualDividend, Long currentPrice, Portfolio portfolio,
		Stock stock) {
		this.id = id;
		this.numShares = numShares;
		this.annualDividend = annualDividend;
		this.currentPrice = currentPrice;
		this.portfolio = portfolio;
		this.stock = stock;
	}

	public static PortfolioHolding empty(Portfolio portfolio, Stock stock) {
		return PortfolioHolding.builder()
			.numShares(0L)
			.annualDividend(0L)
			.currentPrice(null)
			.portfolio(portfolio)
			.stock(stock)
			.build();
	}

	@OneToMany(mappedBy = "portFolioHolding")
	private final List<TradeHistory> tradeHistories = new ArrayList<>();

	//== 연관관계 메소드 ==//
	public void addTradeHistory(TradeHistory tradeHistory) {
		if (!tradeHistories.contains(tradeHistory)) {
			tradeHistories.add(tradeHistory);
		}
	}

	// 종목 총 손익 = (종목 현재가 - 종목 평균 매입가) * 개수
	public long calculateTotalGain() {
		return (currentPrice - calculateAverageCostPerShare()) * numShares;
	}

	// 종목 평균 매입가 = 총 투자 금액 / 개수
	public long calculateAverageCostPerShare() {
		return calculateTotalInvestmentAmount() / numShares;
	}

	// 총 투자 금액 = 투자 금액들의 합계
	public long calculateTotalInvestmentAmount() {
		return tradeHistories.stream()
			.mapToLong(TradeHistory::calculateInvestmentAmount)
			.sum();
	}

	// 종목 총 손익율 = 총 손익 / 총 투자 금액
	public Double calculateTotalReturnRate() {
		return (double)(calculateTotalGain() / calculateTotalInvestmentAmount());
	}

	// 평가 금액(현재 가치) = 현재가 * 개수
	public Long calculateCurrentValue() {
		return currentPrice * numShares;
	}

	public boolean hasMonthlyDividend(LocalDateTime monthDateTime) {
		return stock.hasMonthlyDividend(monthDateTime);
	}

	public long readDividend(LocalDateTime monthDateTime) {
		return stock.readDividend(monthDateTime) * numShares;
	}
}
