package codesquad.fineants.spring.api.kis.manager;

import java.util.HashMap;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AccessTokenManagerTest {

	@DisplayName("액세스토큰이 만료되었다")
	@Test
	void isAccessTokenExpired() {
		// given
		Map<String, Object> map = new HashMap<>();
		map.put("access_token", "accessTokenValue");
		map.put("token_type", "Bearer");
		map.put("expires_in", 86400);
		AccessTokenManager manager = new AccessTokenManager(map);
		// when
		boolean accessTokenExpired = manager.isAccessTokenExpired();
		// then
		Assertions.assertThat(accessTokenExpired).isFalse();
	}
}
