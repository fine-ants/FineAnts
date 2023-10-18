package codesquad.fineants.spring.api.kis;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import codesquad.fineants.spring.api.kis.response.OauthKisApprovalResponse;

@ActiveProfiles("test")
@SpringBootTest
class KisServiceTest {

	@Autowired
	private KisService kisService;

	@DisplayName("실시간(웹소켓) 접속키 발급한다")
	@Test
	void approval() {
		// given

		// when
		OauthKisApprovalResponse response = kisService.approval();

		// then
		assertThat(response)
			.extracting("approvalKey")
			.isNotNull();
	}
}
