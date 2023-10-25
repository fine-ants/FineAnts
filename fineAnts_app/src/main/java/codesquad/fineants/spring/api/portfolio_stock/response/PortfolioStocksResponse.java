package codesquad.fineants.spring.api.portfolio_stock.response;

import java.util.List;
import java.util.stream.Collectors;

import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio_stock.PortfolioHolding;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfolioStocksResponse {
	private PortfolioDetailResponse portfolioDetails;
	private List<PortfolioStockItem> portfolioHoldings;

	public static PortfolioStocksResponse of(Portfolio portfolio, List<PortfolioHolding> portfolioHoldings) {
		PortfolioDetailResponse portfolioDetailResponse = PortfolioDetailResponse.from(portfolio);
		List<PortfolioStockItem> portfolioStockItems = portfolioHoldings.stream()
			.map(PortfolioStockItem::from)
			.collect(Collectors.toList());
		return new PortfolioStocksResponse(portfolioDetailResponse, portfolioStockItems);
	}
}
