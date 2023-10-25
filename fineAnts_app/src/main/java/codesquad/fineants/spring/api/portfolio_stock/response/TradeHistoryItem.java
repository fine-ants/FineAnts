package codesquad.fineants.spring.api.portfolio_stock.response;

import java.time.LocalDateTime;

public class TradeHistoryItem {
	private Long id;
	private LocalDateTime purchaseDate;
	private Long numShares;
	private Double purchasePricePerShare;
	private String memo;
}
