package codesquad.fineants.spring.api.portfolio_stock;

import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.fineants.domain.oauth.support.AuthMember;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio.PortfolioRepository;
import codesquad.fineants.domain.portfolio_stock.PortFolioStockRepository;
import codesquad.fineants.domain.portfolio_stock.PortfolioHolding;
import codesquad.fineants.domain.stock.Stock;
import codesquad.fineants.domain.stock.StockRepository;
import codesquad.fineants.domain.trade_history.TradeHistoryRepository;
import codesquad.fineants.spring.api.errors.errorcode.PortfolioErrorCode;
import codesquad.fineants.spring.api.errors.errorcode.PortfolioStockErrorCode;
import codesquad.fineants.spring.api.errors.errorcode.StockErrorCode;
import codesquad.fineants.spring.api.errors.exception.ForBiddenException;
import codesquad.fineants.spring.api.errors.exception.NotFoundResourceException;
import codesquad.fineants.spring.api.portfolio_stock.request.PortfolioStockCreateRequest;
import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioStockCreateResponse;
import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioStockDeleteResponse;
import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioStocksResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PortfolioStockService {
	private final PortfolioRepository portfolioRepository;
	private final StockRepository stockRepository;
	private final PortFolioStockRepository portFolioStockRepository;
	private final TradeHistoryRepository tradeHistoryRepository;

	@Transactional
	public PortfolioStockCreateResponse addPortfolioStock(Long portfolioId, PortfolioStockCreateRequest request,
		AuthMember authMember) {
		log.info("포트폴리오 종목 추가 서비스 요청 : portfolioId={}, request={}, authMember={}", request, portfolioId, authMember);

		Portfolio portfolio = findPortfolio(portfolioId);
		validatePortfolioAuthorization(portfolio, authMember.getMemberId());

		Stock stock = stockRepository.findById(request.getStockId())
			.orElseThrow(() -> new NotFoundResourceException(StockErrorCode.NOT_FOUND_STOCK));
		PortfolioHolding portFolioHolding = portFolioStockRepository.save(PortfolioHolding.empty(portfolio, stock));

		log.info("포트폴리오 종목 추가 결과 : {}", portFolioHolding);
		return PortfolioStockCreateResponse.from(portFolioHolding);
	}

	private Portfolio findPortfolio(Long portfolioId) {
		return portfolioRepository.findById(portfolioId)
			.orElseThrow(() -> new NotFoundResourceException(PortfolioErrorCode.NOT_FOUND_PORTFOLIO));
	}

	private void validatePortfolioAuthorization(Portfolio portfolio, Long memberId) {
		if (!portfolio.hasAuthorization(memberId)) {
			throw new ForBiddenException(PortfolioErrorCode.NOT_HAVE_AUTHORIZATION);
		}
	}

	@Transactional
	public PortfolioStockDeleteResponse deletePortfolioStock(Long portfolioHoldingId, Long portfolioId,
		AuthMember authMember) {
		log.info("포트폴리오 종목 삭제 서비스 : portfolioHoldingId={}, authMember={}", portfolioHoldingId, authMember);

		Portfolio portfolio = findPortfolio(portfolioId);
		validatePortfolioAuthorization(portfolio, authMember.getMemberId());

		tradeHistoryRepository.deleteAllByPortFolioHoldingIdIn(List.of(portfolioHoldingId));
		try {
			portFolioStockRepository.deleteById(portfolioHoldingId);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundResourceException(PortfolioStockErrorCode.NOT_FOUND_PORTFOLIO_STOCK);
		}
		return new PortfolioStockDeleteResponse(portfolioHoldingId);
	}

	public PortfolioStocksResponse readMyPortfolioStocks(Long portfolioId, AuthMember authMember) {
		return null;
	}
}
