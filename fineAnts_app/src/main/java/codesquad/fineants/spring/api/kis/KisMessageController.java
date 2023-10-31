package codesquad.fineants.spring.api.kis;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

import codesquad.fineants.spring.api.kis.request.MessageData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class KisMessageController {

	private final KisService kisService;

	@MessageMapping("/currentPrice")
	public void currentPrice(@Payload MessageData messageData) {
		log.info("tickerSymbols : {}", messageData.getTickerSymbols());
		kisService.addTickerSymbols(messageData.getTickerSymbols());
	}

	@MessageMapping("/portfolio/{portfolioId}/currentPrice")
	public void portfolioHolding(
		@DestinationVariable Long portfolioId,
		@Payload MessageData messageData) {
		log.info("portfolioId : {}, messageData : {}", portfolioId, messageData);
		kisService.addTickerSymbols(messageData.getTickerSymbols());
		kisService.addPortfolioSubscription(new PortfolioSubscription(portfolioId, messageData.getTickerSymbols()));
	}
}
