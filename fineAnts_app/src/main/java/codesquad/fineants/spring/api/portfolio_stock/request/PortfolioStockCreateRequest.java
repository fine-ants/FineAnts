package codesquad.fineants.spring.api.portfolio_stock.request;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PortfolioStockCreateRequest {
	@NotNull(message = "종목 등록번호는 필수 정보입니다")
	private Long stockId;
}
