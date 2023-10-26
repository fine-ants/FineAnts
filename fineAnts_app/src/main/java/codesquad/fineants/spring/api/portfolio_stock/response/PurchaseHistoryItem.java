package codesquad.fineants.spring.api.portfolio_stock.response;

import java.time.LocalDateTime;

public class PurchaseHistoryItem {
	private Long id;
	private LocalDateTime purchaseDate;
	private Long numShares;
	private Double purchasePricePerShare;
	private String memo;
}
