package codesquad.fineants.spring.api.kis;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class KisMessageController {

	private final KisService kisService;

	@MessageMapping("/realTimeSigningPrice/{stockCode}")
	public void readRealTimeSigningPrice(@DestinationVariable String stockCode) {
		log.info("stockCode : {}", stockCode);
		kisService.readRealTimeSigningPrice(stockCode);
	}
}
