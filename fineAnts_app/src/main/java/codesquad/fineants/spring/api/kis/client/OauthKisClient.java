package codesquad.fineants.spring.api.kis.client;

import java.util.HashMap;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import codesquad.fineants.spring.api.errors.errorcode.ErrorCode;
import codesquad.fineants.spring.api.errors.errorcode.OauthErrorCode;
import codesquad.fineants.spring.api.errors.exception.OauthException;
import codesquad.fineants.spring.api.kis.properties.OauthKisProperties;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class OauthKisClient {

	private static final String approvalURI = "https://openapivts.koreainvestment.com:29443/oauth2/Approval";
	private static final String hashkeyURI = "https://openapivts.koreainvestment.com:29443/uapi/hashkey";
	private static final String tokenPURI = "https://openapivts.koreainvestment.com:29443/oauth2/tokenP";
	public static final String realTimeSigningPriceURI = "ws://ops.koreainvestment.com:31000/tryitout/H0STCNT0";

	private final String appkey;
	private final String secretkey;

	public OauthKisClient(OauthKisProperties properties) {
		this.appkey = properties.getAppkey();
		this.secretkey = properties.getSecretkey();
	}

	public String approval() {
		MultiValueMap<String, String> headerMap = new LinkedMultiValueMap<>();
		headerMap.add("content-type", MediaType.APPLICATION_JSON.toString());

		Map<String, String> requestBodyMap = new HashMap<>();
		requestBodyMap.put("grant_type", "client_credentials");
		requestBodyMap.put("appkey", appkey);
		requestBodyMap.put("secretkey", secretkey);
		return (String)perform(approvalURI, headerMap, requestBodyMap).get("approval_key");
	}

	public Map<String, Object> hashKey(Map<String, String> requestBodyMap) {
		MultiValueMap<String, String> headerMap = new LinkedMultiValueMap<>();
		headerMap.add("content-type", MediaType.APPLICATION_JSON.toString());
		headerMap.add("appkey", appkey);
		headerMap.add("appsecret", secretkey);
		return perform(
			hashkeyURI,
			headerMap,
			requestBodyMap);
	}

	private Map<String, Object> perform(String uri, MultiValueMap<String, String> headerMap,
		Map<String, String> requestBodyMap) {
		WebClient.ResponseSpec responseSpec = WebClient.create()
			.post()
			.uri(uri)
			.headers(header -> header.addAll(headerMap))
			.bodyValue(requestBodyMap)
			.retrieve();

		return handleClientResponse(responseSpec);
	}

	private Map<String, Object> handleClientResponse(WebClient.ResponseSpec responseSpec) {
		WebClient.ResponseSpec response = responseSpec.onStatus(HttpStatus::is4xxClientError,
				clientResponse -> handleError(clientResponse, OauthErrorCode.FAIL_ACCESS_TOKEN))
			.onStatus(HttpStatus::is5xxServerError,
				clientResponse -> handleError(clientResponse, OauthErrorCode.FAIL_ACCESS_TOKEN));

		return response.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
		}).block();
	}

	private Mono<? extends Throwable> handleError(ClientResponse clientResponse, ErrorCode errorCode) {
		return clientResponse.bodyToMono(String.class)
			.doOnNext(body -> log.info("responseBody : {}", body))
			.flatMap(body -> Mono.error(new OauthException(errorCode)));
	}

	public Map<String, Object> tokenP() {
		Map<String, String> requestBodyMap = new HashMap<>();
		requestBodyMap.put("grant_type", "client_credentials");
		requestBodyMap.put("appkey", appkey);
		requestBodyMap.put("appsecret", secretkey);

		return perform(
			tokenPURI,
			new LinkedMultiValueMap<>(),
			requestBodyMap
		);
	}

	public void readRealTimeSigningPrice(String approvalKey, KisWebSocketClientEndpoint clientEndpoint,
		String stockCode) {
		String message;
		try {
			message = new ObjectMapper().writeValueAsString(getRequestMap(approvalKey, stockCode));
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
		clientEndpoint.sendMessage(message);
	}

	private static Map<String, Object> getRequestMap(String approvalKey, String stockCode) {
		Map<String, Object> headerMap = new HashMap<>();
		headerMap.put("approval_key", approvalKey);
		headerMap.put("custtype", "P");
		headerMap.put("tr_type", "1");
		headerMap.put("content-type", "utf-8");

		Map<String, Object> requestBodyMap = new HashMap<>();
		requestBodyMap.put("tr_id", "H0STCNT0");
		requestBodyMap.put("tr_key", stockCode);

		Map<String, Object> data = new HashMap<>();
		data.put("header", headerMap);

		Map<String, Object> data2 = new HashMap<>();
		data2.put("input", requestBodyMap);

		data.put("body", data2);
		return data;
	}

}
