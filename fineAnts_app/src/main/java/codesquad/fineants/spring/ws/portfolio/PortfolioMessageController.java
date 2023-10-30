package codesquad.fineants.spring.ws.portfolio;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import codesquad.fineants.spring.api.kis.KisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class PortfolioMessageController {

	private final KisService service;

	@MessageMapping("/realTimeCurrentPrice/{tickerSymbol}")
	public void readRealTimeSigningPrice(@DestinationVariable String tickerSymbol) {
		log.info("tickerSymbol : {}", tickerSymbol);
		service.readRealTimeCurrentPrice(tickerSymbol);
	}
}
