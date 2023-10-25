package codesquad.fineants.elasticsearch.service.response;

import codesquad.fineants.elasticsearch.document.StockSearch;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class StockSearchItem {
	private String stockcode;
	private String tickerSymbol;
	private String companyName;
	private String engCompanyName;
	private String market;

	public static StockSearchItem from(StockSearch search) {
		return new StockSearchItem(
			search.getStockcode(),
			search.getTickerSymbol(),
			search.getCompanyName(),
			search.getEngCompanyName(),
			search.getMarket()
		);
	}
}
