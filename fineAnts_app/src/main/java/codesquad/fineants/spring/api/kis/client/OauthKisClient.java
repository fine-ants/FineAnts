package codesquad.fineants.spring.api.kis.client;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import codesquad.fineants.spring.api.kis.response.KisRealTimeSigningPriceResponse;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class OauthKisClient {

	private static final String approvalURI = "https://openapivts.koreainvestment.com:29443/oauth2/Approval";
	private static final String hashkeyURI = "https://openapivts.koreainvestment.com:29443/uapi/hashkey";
	private static final String tokenPURI = "https://openapivts.koreainvestment.com:29443/oauth2/tokenP";

	private final String appkey;
	private final String secretkey;

	public OauthKisClient(OauthKisProperties properties) {
		this.appkey = properties.getAppkey();
		this.secretkey = properties.getSecretkey();
	}

	public Map<String, Object> approval() {
		MultiValueMap<String, String> headerMap = new LinkedMultiValueMap<>();
		headerMap.add("content-type", MediaType.APPLICATION_JSON.toString());

		Map<String, String> requestBodyMap = new HashMap<>();
		requestBodyMap.put("grant_type", "client_credentials");
		requestBodyMap.put("appkey", appkey);
		requestBodyMap.put("secretkey", secretkey);
		return perform(
			approvalURI,
			headerMap,
			requestBodyMap
		);
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

	public Map<String, Object> readRealTimeSigningPrice() {
		String approvalKey = (String)approval().get("approval_key");

		try {
			KisWebSocketClientEndpoint clientEndpoint = new KisWebSocketClientEndpoint(
				new URI("ws://ops.koreainvestment.com:31000/tryitout/H0STCNT0"));
			clientEndpoint.addMessageHandler(message -> {
				log.info("메시지 수신 결과 : {}", message);
				List<String> stockInfos = Arrays.stream(message.split("[|\\\\^]"))
					.skip(3)
					.limit(3)
					.collect(Collectors.toList());
				if (!stockInfos.isEmpty()) {
					KisRealTimeSigningPriceResponse response = new KisRealTimeSigningPriceResponse(
						stockInfos);
					log.info("response : {}", response);
				}
			});

			Map<String, Object> headerMap = new HashMap<>();
			headerMap.put("approval_key", approvalKey);
			headerMap.put("custtype", "P");
			headerMap.put("tr_type", "1");
			headerMap.put("content-type", "utf-8");

			Map<String, Object> requestBodyMap = new HashMap<>();
			requestBodyMap.put("tr_id", "H0STCNT0");
			requestBodyMap.put("tr_key", "005930");

			Map<String, Object> data = new HashMap<>();
			data.put("header", headerMap);

			Map<String, Object> data2 = new HashMap<>();
			data2.put("input", requestBodyMap);

			data.put("body", data2);

			String message = new ObjectMapper().writeValueAsString(data);

			clientEndpoint.sendMessage(message);

			Thread.sleep(5000L);

		} catch (URISyntaxException | JsonProcessingException | InterruptedException e) {
			throw new RuntimeException(e);
		}
		return null;
	}
}
