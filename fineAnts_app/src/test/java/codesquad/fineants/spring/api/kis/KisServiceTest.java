package codesquad.fineants.spring.api.kis;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ActiveProfiles("test")
@SpringBootTest
class KisServiceTest {

	@Autowired
	private KisService kisService;

	@DisplayName("클라이언트는 접근토큰발급한다")
	@Test
	void tokenP() {
		// given

		// when
		Map<String, Object> response = kisService.accessTokenMap();

		log.info((String)response.get("access_token"));
		// then
		assertThat(response).containsKeys("access_token", "access_token_token_expired", "token_type", "expires_in");
	}

	@DisplayName("주식 현재가 시세를 가져온다")
	@Test
	void readRealTimeCurrentPrice() {
		// given
		String tickerSymbol = "005930";
		// when
		kisService.readRealTimeCurrentPrice(tickerSymbol);
		// then
	}

	@DisplayName("1초마다 주식 현재가 시세를 요청하고 갱신합니다.")
	@Test
	void publishCurrentPrice() throws InterruptedException {
		// given

		// when
		kisService.addTickerSymbols(List.of("005930", "035720"));
		Thread.sleep(5000L);
		// then
	}

}
