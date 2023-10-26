package codesquad.fineants.spring.api.purchase_history;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.fineants.domain.oauth.support.AuthMember;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio_holding.PortFolioHoldingRepository;
import codesquad.fineants.domain.portfolio_holding.PortfolioHolding;
import codesquad.fineants.domain.purchase_history.PurchaseHistory;
import codesquad.fineants.domain.purchase_history.PurchaseHistoryRepository;
import codesquad.fineants.spring.api.errors.errorcode.PortfolioErrorCode;
import codesquad.fineants.spring.api.errors.errorcode.PortfolioHoldingErrorCode;
import codesquad.fineants.spring.api.errors.exception.ForBiddenException;
import codesquad.fineants.spring.api.errors.exception.NotFoundResourceException;
import codesquad.fineants.spring.api.purchase_history.request.PurchaseHistoryCreateRequest;
import codesquad.fineants.spring.api.purchase_history.response.PurchaseHistoryCreateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PurchaseHistoryService {
	private final PurchaseHistoryRepository repository;
	private final PortFolioHoldingRepository portFolioHoldingRepository;

	@Transactional
	public PurchaseHistoryCreateResponse addPurchaseHistory(PurchaseHistoryCreateRequest request,
		Long portfolioHoldingId,
		AuthMember authMember) {
		log.info("매입이력 추가 서비스 요청 : request={}, portfolioHoldingId={}", request, portfolioHoldingId);
		PortfolioHolding portfolioHolding = findPortfolioHolding(portfolioHoldingId);
		validatePortfolioAuthorization(portfolioHolding.getPortfolio(), authMember.getMemberId());
		PurchaseHistory savePurchaseHistory = repository.save(request.toEntity(portfolioHolding));
		return PurchaseHistoryCreateResponse.from(savePurchaseHistory);
	}

	private PortfolioHolding findPortfolioHolding(Long portfolioHoldingId) {
		return portFolioHoldingRepository.findById(portfolioHoldingId)
			.orElseThrow(() -> new NotFoundResourceException(PortfolioHoldingErrorCode.NOT_FOUND_PORTFOLIO_HOLDING));
	}

	private void validatePortfolioAuthorization(Portfolio portfolio, Long memberId) {
		if (!portfolio.hasAuthorization(memberId)) {
			throw new ForBiddenException(PortfolioErrorCode.NOT_HAVE_AUTHORIZATION);
		}
	}
}
