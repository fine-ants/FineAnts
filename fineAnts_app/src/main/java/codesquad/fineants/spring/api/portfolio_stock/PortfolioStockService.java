package codesquad.fineants.spring.api.portfolio_stock;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.fineants.domain.oauth.support.AuthMember;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio.PortfolioRepository;
import codesquad.fineants.domain.portfolio_stock.PortFolioStockRepository;
import codesquad.fineants.domain.portfolio_stock.PortfolioStock;
import codesquad.fineants.domain.stock.Stock;
import codesquad.fineants.domain.stock.StockRepository;
import codesquad.fineants.spring.api.errors.errorcode.PortfolioErrorCode;
import codesquad.fineants.spring.api.errors.errorcode.StockErrorCode;
import codesquad.fineants.spring.api.errors.exception.NotFoundResourceException;
import codesquad.fineants.spring.api.portfolio_stock.request.PortfolioStockCreateRequest;
import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioStockCreateResponse;
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

	@Transactional
	public PortfolioStockCreateResponse addPortfolioStock(Long portfolioId, PortfolioStockCreateRequest request,
		AuthMember authMember) {
		log.info("포트폴리오 종목 추가 서비스 요청 : portfolioId={}, request={}, authMember={}", request, portfolioId, authMember);

		Portfolio portfolio = portfolioRepository.findById(portfolioId)
			.orElseThrow(() -> new NotFoundResourceException(PortfolioErrorCode.NOT_FOUND_PORTFOLIO));
		Stock stock = stockRepository.findById(request.getStockId())
			.orElseThrow(() -> new NotFoundResourceException(StockErrorCode.NOT_FOUND_STOCK));
		PortfolioStock portFolioStock = portFolioStockRepository.save(PortfolioStock.empty(portfolio, stock));

		log.info("포트폴리오 종목 추가 결과 : {}", portFolioStock);
		return PortfolioStockCreateResponse.from(portFolioStock);
	}
}
