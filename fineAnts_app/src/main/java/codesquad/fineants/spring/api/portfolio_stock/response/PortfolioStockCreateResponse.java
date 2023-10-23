package codesquad.fineants.spring.api.portfolio_stock.response;

import codesquad.fineants.domain.portfolio_stock.PortfolioStock;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfolioStockCreateResponse {

	private Long portfolioStockId;

	public static PortfolioStockCreateResponse from(PortfolioStock portFolioStock) {
		return new PortfolioStockCreateResponse(portFolioStock.getId());
	}
}
