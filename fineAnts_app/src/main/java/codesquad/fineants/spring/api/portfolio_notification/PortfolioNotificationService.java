package codesquad.fineants.spring.api.portfolio_notification;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio.PortfolioRepository;
import codesquad.fineants.spring.api.errors.errorcode.PortfolioErrorCode;
import codesquad.fineants.spring.api.errors.exception.NotFoundResourceException;
import codesquad.fineants.spring.api.portfolio_notification.request.PortfolioNotificationModifyRequest;
import codesquad.fineants.spring.api.portfolio_notification.response.PortfolioNotificationModifyResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PortfolioNotificationService {

	private final PortfolioRepository portfolioRepository;

	@Transactional
	public PortfolioNotificationModifyResponse modifyPortfolioNotification(PortfolioNotificationModifyRequest request,
		Long portfolioId) {
		log.info("포트폴리오 알림 수정 서비스, request={}, portfolioId={}", request, portfolioId);
		Portfolio portfolio = findPortfolio(portfolioId);
		portfolio.changeNotification(request.getIsActive());
		log.info("포트폴리오 알림 수정 서비스 결과 : portfolio={}", portfolio);
		return PortfolioNotificationModifyResponse.from(portfolio);
	}

	private Portfolio findPortfolio(Long portfolioId) {
		return portfolioRepository.findById(portfolioId)
			.orElseThrow(() -> new NotFoundResourceException(PortfolioErrorCode.NOT_FOUND_PORTFOLIO));
	}
}
