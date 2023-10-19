package codesquad.fineants.spring.api.kis.client;

import static org.assertj.core.api.Assertions.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
class OauthKisClientTest {

	@Autowired
	private OauthKisClient oauthKisClient;

	@DisplayName("실시간(웹소켓) 접속키 발급한다")
	@Test
	void approval() {
		// given

		// when
		Map<String, Object> response = oauthKisClient.approval();

		// then
		assertThat(response.get("approval_key")).isNotNull();
	}

	@DisplayName("리퀘스트 바디의 값을 암화하한다")
	@Test
	void hashkey() {
		// given
		Map<String, String> map = new HashMap<>();
		map.put("CANO", "00000000");
		map.put("ACNT_PRDT_CD", "01");
		map.put("OVRS_EXCG_CD", "SHAA");
		// when
		Map<String, Object> responseMap = oauthKisClient.hashKey(map);

		// then
		System.out.println(responseMap);
	}

	@DisplayName("클라이언트는 접근토큰발급한다")
	@Test
	void tokenP() {
		// given

		// when
		Map<String, Object> response = oauthKisClient.tokenP();

		// then
		assertThat(response).containsKeys("access_token", "access_token_token_expired", "token_type", "expires_in");
	}

	@DisplayName("실시간 체결가를 조회합니다.")
	@Test
	void readRealTimeSigningPrice() {
		// given

		// when
		Map<String, Object> response = oauthKisClient.readRealTimeSigningPrice();
		// then
		System.out.println(response);

	}
}
