package codesquad.fineants.spring.api.portfolio_stock.response;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import codesquad.fineants.domain.portfolio_holding.PortfolioHolding;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfolioStockItem {

	@JsonUnwrapped
	private StockItem stock;
	@JsonUnwrapped
	private PortfolioHoldingDetailItem portfolioHolding;
	private List<PurchaseHistoryItem> purchaseHistory;

	public static PortfolioStockItem from(PortfolioHolding portfolioHolding) {
		StockItem stockItem = StockItem.from(portfolioHolding.getStock());
		PortfolioHoldingDetailItem holdingDetailItem = PortfolioHoldingDetailItem.from(portfolioHolding);
		List<PurchaseHistoryItem> purchaseHistory = new ArrayList<>();
		return new PortfolioStockItem(stockItem, holdingDetailItem, purchaseHistory);
	}
}
