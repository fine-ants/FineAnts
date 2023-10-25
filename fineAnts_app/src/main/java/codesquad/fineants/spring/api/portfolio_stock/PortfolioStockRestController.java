package codesquad.fineants.spring.api.portfolio_stock;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import codesquad.fineants.domain.oauth.support.AuthMember;
import codesquad.fineants.domain.oauth.support.AuthPrincipalMember;
import codesquad.fineants.spring.api.portfolio_stock.request.PortfolioStockCreateRequest;
import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioStocksResponse;
import codesquad.fineants.spring.api.response.ApiResponse;
import codesquad.fineants.spring.api.success.code.PortfolioStockSuccessCode;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/portfolio/{portfolioId}/holdings")
@RequiredArgsConstructor
@RestController
public class PortfolioStockRestController {

	private final PortfolioStockService portfolioStockService;

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping
	public ApiResponse<Void> addPortfolioStock(@PathVariable Long portfolioId,
		@Valid @RequestBody PortfolioStockCreateRequest request,
		@AuthPrincipalMember AuthMember authMember) {
		portfolioStockService.addPortfolioStock(portfolioId, request, authMember);
		return ApiResponse.success(PortfolioStockSuccessCode.CREATED_ADD_PORTFOLIO_STOCK);
	}

	@DeleteMapping("/{portfolioHoldingId}")
	public ApiResponse<Void> deletePortfolioStock(@PathVariable Long portfolioId,
		@PathVariable Long portfolioHoldingId,
		@AuthPrincipalMember AuthMember authMember) {
		portfolioStockService.deletePortfolioStock(portfolioHoldingId, portfolioId, authMember);
		return ApiResponse.success(PortfolioStockSuccessCode.OK_DELETE_PORTFOLIO_STOCK);
	}

	@GetMapping
	public ApiResponse<PortfolioStocksResponse> readMyPortfolioStocks(@PathVariable Long portfolioId,
		@AuthPrincipalMember AuthMember authMember) {
		PortfolioStocksResponse response = portfolioStockService.readMyPortfolioStocks(portfolioId, authMember);
		return ApiResponse.success(PortfolioStockSuccessCode.OK_READ_PORTFOLIO_STOCKS, response);
	}
}
