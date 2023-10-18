package codesquad.fineants.spring.api.kis.client;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import codesquad.fineants.spring.api.errors.errorcode.OauthErrorCode;
import codesquad.fineants.spring.api.errors.exception.OauthException;
import codesquad.fineants.spring.api.kis.properties.OauthKisProperties;
import codesquad.fineants.spring.api.kis.request.OauthKisApprovalRequest;
import codesquad.fineants.spring.api.kis.response.OauthKisApprovalResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class OauthKisClient {

	private final String appkey;
	private final String secretkey;

	public OauthKisClient(OauthKisProperties properties) {
		this.appkey = properties.getAppkey();
		this.secretkey = properties.getSecretkey();
	}

	public OauthKisApprovalResponse approval() {
		OauthKisApprovalRequest request = new OauthKisApprovalRequest("client_credentials", appkey,
			secretkey);

		return WebClient.create()
			.post()
			.uri("https://openapivts.koreainvestment.com:29443/oauth2/Approval")
			.headers(header -> {
				header.setContentType(MediaType.APPLICATION_JSON);
			})
			.bodyValue(request)
			.exchangeToMono(clientResponse -> {
				log.info("statusCode : {}", clientResponse.statusCode());
				if (clientResponse.statusCode().is4xxClientError() || clientResponse.statusCode().is5xxServerError()) {
					return clientResponse.bodyToMono(String.class).handle((body, sink) -> {
						log.info("responseBody : {}", body);
						sink.error(new OauthException(OauthErrorCode.FAIL_ACCESS_TOKEN));
					});
				}
				return clientResponse.bodyToMono(OauthKisApprovalResponse.class);
			}).block();
	}
}
