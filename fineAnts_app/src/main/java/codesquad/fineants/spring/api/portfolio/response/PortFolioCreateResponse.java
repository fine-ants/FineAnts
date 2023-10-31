package codesquad.fineants.spring.api.portfolio.response;

import codesquad.fineants.domain.portfolio.Portfolio;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PortFolioCreateResponse {

	private Long id;
	private String name;

	public static PortFolioCreateResponse from(Portfolio portfolio) {
		return new PortFolioCreateResponse(portfolio.getId(), portfolio.getName());
	}
}
