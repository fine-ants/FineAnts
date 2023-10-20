package codesquad.fineants.spring.api.kis;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codesquad.fineants.spring.api.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/kis")
@RequiredArgsConstructor
@RestController
public class KisRestController {

	private final KisService kisService;

	@PostMapping("/oauth2/approval")
	public ApiResponse<String> approval() {
		return ApiResponse.ok("실시간(웹소켓) 접속키 발급 성공하였습니다.", kisService.approval());
	}

}
