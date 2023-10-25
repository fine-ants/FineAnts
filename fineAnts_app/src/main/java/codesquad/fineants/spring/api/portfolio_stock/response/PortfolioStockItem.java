package codesquad.fineants.spring.api.portfolio_stock.response;

import java.util.List;

import codesquad.fineants.domain.portfolio_stock.PortfolioHolding;

public class PortfolioStockItem {
	private StockItem stock;
	private PortfolioStockDetailItem portfolioStock;
	private List<TradeHistoryItem> tradeHistories;

	public static PortfolioStockItem from(PortfolioHolding portfolioHolding) {
		return null;
	}
}
