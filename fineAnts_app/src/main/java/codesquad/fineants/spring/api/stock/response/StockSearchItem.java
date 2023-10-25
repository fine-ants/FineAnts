package codesquad.fineants.spring.api.stock.response;

import codesquad.fineants.domain.stock.Market;
import codesquad.fineants.domain.stock.Stock;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class StockSearchItem {
	private String companyName;
	private String engCompanyName;
	private String stockcode;
	private String tickerSymbol;
	private Market market;

	public static StockSearchItem from(Stock stock) {
		return new StockSearchItem(stock.getCompanyName(), stock.getEngCompanyName(), stock.getStockcode(),
			stock.getTickerSymbol(), stock.getMarket());
	}
}
