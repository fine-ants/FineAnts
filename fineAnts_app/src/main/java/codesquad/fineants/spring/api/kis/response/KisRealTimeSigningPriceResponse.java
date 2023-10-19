package codesquad.fineants.spring.api.kis.response;

import java.util.List;

import lombok.ToString;

@ToString
public class KisRealTimeSigningPriceResponse {
	private String mksc_shrn_iscd; // 유가증권 단축 종목코드
	private String stck_cntg_hour; // 주식 체결 시간
	private String stck_prpr; // 주식 현재가

	public KisRealTimeSigningPriceResponse(List<String> stockInfos) {
		this.mksc_shrn_iscd = stockInfos.get(0);
		this.stck_cntg_hour = stockInfos.get(1);
		this.stck_prpr = stockInfos.get(2);
	}

}
