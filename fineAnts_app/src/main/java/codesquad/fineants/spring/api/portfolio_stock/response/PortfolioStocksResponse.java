package codesquad.fineants.spring.api.portfolio_stock.response;

import java.util.List;
import java.util.stream.Collectors;

import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio_stock.PortfolioStock;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfolioStocksResponse {
	private PortfolioDetailResponse portfolio;
	private List<PortfolioStockItem> portfolioStocks;

	public static PortfolioStocksResponse of(Portfolio portfolio, List<PortfolioStock> portfolioStocks) {
		PortfolioDetailResponse portfolioDetailResponse = PortfolioDetailResponse.from(portfolio);
		List<PortfolioStockItem> portfolioStockItems = portfolioStocks.stream()
			.map(PortfolioStockItem::from)
			.collect(Collectors.toList());
		return new PortfolioStocksResponse(portfolioDetailResponse, portfolioStockItems);
	}
}
