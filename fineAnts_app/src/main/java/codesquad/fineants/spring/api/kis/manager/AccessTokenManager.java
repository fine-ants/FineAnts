package codesquad.fineants.spring.api.kis.manager;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.stereotype.Component;

import codesquad.fineants.spring.api.kis.KisRedisService;
import codesquad.fineants.spring.api.kis.client.KisClient;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class AccessTokenManager {
	private String accessToken;
	private String tokenType;
	private LocalDateTime expirationDate;

	public AccessTokenManager(Map<String, Object> accessTokenMap) {
		this.accessToken = (String)accessTokenMap.get("access_token");
		this.tokenType = (String)accessTokenMap.get("token_type");
		this.expirationDate = LocalDateTime.now().plusSeconds((int)accessTokenMap.get("expires_in"));
	}

	// AccessToken의 만료 여부를 확인하는 메서드
	public boolean isAccessTokenExpired() {
		// 만료 여부를 확인하는 로직 구현
		return LocalDateTime.now().isAfter(expirationDate);
	}

	// AccessToken을 다시 초기화하는 메서드
	public void refreshAccessToken(KisRedisService redisService, KisClient kisClient) {
		// 새로운 AccessToken을 가져오는 로직 구현
		Map<String, Object> newAccessToken = getNewAccessToken(redisService, kisClient);
		this.accessToken = (String)newAccessToken.get("access_token");
		this.tokenType = (String)newAccessToken.get("token_type");
		this.expirationDate = LocalDateTime.now().plusSeconds((int)newAccessToken.get("expires_in"));
	}

	// 새로운 AccessToken을 가져오는 로직
	private Map<String, Object> getNewAccessToken(KisRedisService redisService, KisClient kisClient) {
		final Map<String, Object> newAccessTokenMap = kisClient.accessToken();
		redisService.setAccessTokenMap(newAccessTokenMap);
		log.info("newAccessTokenMap : {}", newAccessTokenMap);
		return newAccessTokenMap;
	}

	public String createAuthorization() {
		return String.format("%s %s", tokenType, accessToken);
	}
}
