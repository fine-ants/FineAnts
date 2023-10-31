package codesquad.fineants.spring.api.portfolio.response;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import codesquad.fineants.domain.page.ScrollPaginationCollection;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio_gain_history.PortfolioGainHistory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfoliosResponse {
	private final List<PortFolioItem> portfolios;
	private final boolean hasNext;
	private final Long nextCursor;

	public static PortfoliosResponse of(ScrollPaginationCollection<Portfolio> portfoliosScroll,
		Map<Portfolio, PortfolioGainHistory> portfolioGainHistoryMap, Map<String, Long> currentPriceMap) {
		if (portfoliosScroll.isLastScroll()) {
			return PortfoliosResponse.newLastScroll(portfoliosScroll.getCurrentScrollItems(), portfolioGainHistoryMap,
				currentPriceMap);
		}
		return newScrollHasNext(portfoliosScroll.getCurrentScrollItems(), portfolioGainHistoryMap,
			portfoliosScroll.getNextCursor().getId(), currentPriceMap);
	}

	private static PortfoliosResponse newLastScroll(List<Portfolio> portfolios,
		Map<Portfolio, PortfolioGainHistory> portfolioGainHistoryMap, Map<String, Long> currentPriceMap) {
		return newScrollHasNext(portfolios, portfolioGainHistoryMap, null, currentPriceMap);
	}

	private static PortfoliosResponse newScrollHasNext(List<Portfolio> portfolios,
		Map<Portfolio, PortfolioGainHistory> portfolioGainHistoryMap,
		Long nextCursor, Map<String, Long> currentPriceMap) {
		if (nextCursor != null) {
			return new PortfoliosResponse(getContents(portfolios, portfolioGainHistoryMap, currentPriceMap), true,
				nextCursor);
		}
		return new PortfoliosResponse(getContents(portfolios, portfolioGainHistoryMap, currentPriceMap), false, null);
	}

	private static List<PortFolioItem> getContents(List<Portfolio> portfolios,
		Map<Portfolio, PortfolioGainHistory> portfolioGainHistoryMap, Map<String, Long> currentPriceMap) {
		return portfolios.stream()
			.map(portfolio -> {
				portfolio.changeCurrentPriceFromHoldings(currentPriceMap);
				return PortFolioItem.of(portfolio, portfolioGainHistoryMap.get(portfolio));
			})
			.collect(Collectors.toList());
	}
}
