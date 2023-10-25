package codesquad.fineants.domain.trade_history;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import codesquad.fineants.domain.BaseEntity;
import codesquad.fineants.domain.portfolio_stock.PortfolioHolding;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TradeHistory extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDateTime purchaseDate;
	private Long purchasePricePerShare;
	private Long numShares;
	private String memo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "portfolio_holding_id")
	private PortfolioHolding portFolioHolding;

	@Builder
	public TradeHistory(Long id, LocalDateTime purchaseDate, Long purchasePricePerShare, Long numShares,
		String memo,
		PortfolioHolding portFolioHolding) {
		this.id = id;
		this.purchaseDate = purchaseDate;
		this.purchasePricePerShare = purchasePricePerShare;
		this.numShares = numShares;
		this.memo = memo;
		this.portFolioHolding = portFolioHolding;
	}

	// 투자 금액 = 주당 매입가 * 개수
	public long calculateInvestmentAmount() {
		return purchasePricePerShare * numShares;
	}
}
