package codesquad.fineants.spring.api.portfolio.response;

import java.util.List;
import java.util.stream.Collectors;

import codesquad.fineants.domain.page.ScrollPaginationCollection;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio_gain_history.PortfolioGainHistory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PortfoliosResponse {
	private final List<PortFolioItem> portfolios;
	private final Long nextCursor;

	public static PortfoliosResponse of(ScrollPaginationCollection<Portfolio> portfoliosScroll,
		PortfolioGainHistory history) {
		if (portfoliosScroll.isLastScroll()) {
			return PortfoliosResponse.newLastScroll(portfoliosScroll.getCurrentScrollItems(), history);
		}
		return newScrollHasNext(portfoliosScroll.getCurrentScrollItems(), history,
			portfoliosScroll.getNextCursor().getId());
	}

	private static PortfoliosResponse newLastScroll(List<Portfolio> portfolios, PortfolioGainHistory history) {
		return newScrollHasNext(portfolios, history, null);
	}

	private static PortfoliosResponse newScrollHasNext(List<Portfolio> portfolios, PortfolioGainHistory history,
		Long nextCursor) {
		return new PortfoliosResponse(getContents(portfolios, history), nextCursor);
	}

	private static List<PortFolioItem> getContents(List<Portfolio> portfolios, PortfolioGainHistory history) {
		return portfolios.stream()
			.map(portfolio -> PortFolioItem.of(portfolio, history))
			.collect(Collectors.toList());
	}
}
