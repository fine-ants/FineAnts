package codesquad.fineants.spring.api.kis.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OauthKisApprovalRequest {
	@JsonProperty("grant_type")
	private String grantType;

	private String appkey;

	private String secretkey;
}
