package codesquad.fineants.spring.api.portfolio_stock.response;

import java.util.ArrayList;
import java.util.List;

import codesquad.fineants.domain.portfolio_stock.PortfolioHolding;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfolioStockItem {
	private StockItem stock;
	private PortfolioHoldingDetailItem portfolioHolding;
	private List<TradeHistoryItem> tradeHistories;

	public static PortfolioStockItem from(PortfolioHolding portfolioHolding) {
		StockItem stockItem = StockItem.from(portfolioHolding.getStock());
		PortfolioHoldingDetailItem holdingDetailItem = PortfolioHoldingDetailItem.from(portfolioHolding);
		List<TradeHistoryItem> tradeHistories = new ArrayList<>();
		return new PortfolioStockItem(stockItem, holdingDetailItem, tradeHistories);
	}
}
