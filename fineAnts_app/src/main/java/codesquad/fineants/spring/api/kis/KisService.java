package codesquad.fineants.spring.api.kis;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import codesquad.fineants.spring.api.kis.client.KisClient;
import codesquad.fineants.spring.api.kis.response.CurrentPriceResponse;
import codesquad.fineants.spring.api.portfolio_stock.PortfolioStockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class KisService {

	private static final String SUBSCRIBE_CURRENT_PRICE = "/sub/currentPrice/";
	private static final Map<String, Long> currentPriceMap = new ConcurrentHashMap<>();
	private static final Set<PortfolioSubscription> portfolioSubscriptions = new HashSet<>();
	private final KisClient kisClient;
	private final KisRedisService redisService;
	private final KisClientScheduler scheduler;
	private final SimpMessagingTemplate messagingTemplate;
	private final PortfolioStockService portfolioStockService;
	private Map<String, Object> accessTokenMap;

	@PostConstruct
	private void init() {
		this.accessTokenMap = accessTokenMap();
	}

	public Map<String, Object> accessTokenMap() {
		final Map<String, Object> accessTokenMap = redisService.getAccessTokenMap();
		if (accessTokenMap != null) {
			log.info("accessTokenMap : {}", accessTokenMap);
			return accessTokenMap;
		}
		final Map<String, Object> newAccessTokenMap = kisClient.accessToken();
		redisService.setAccessTokenMap(newAccessTokenMap);
		log.info("newAccessTokenMap : {}", newAccessTokenMap);
		return newAccessTokenMap;
	}

	// 제약조건 : kis 서버에 1초당 최대 5건, TR간격 0.1초 이하면 안됨
	public CurrentPriceResponse readRealTimeCurrentPrice(String tickerSymbol) {
		Map<String, String> output = (Map<String, String>)kisClient.readRealTimeCurrentPrice(tickerSymbol,
			accessTokenMap).get("output");
		long currentPrice = Long.parseLong(output.get("stck_prpr"));
		log.info("tickerSymbol={}, currentPrice={}, time={}", tickerSymbol, currentPrice, LocalDateTime.now());
		return new CurrentPriceResponse(tickerSymbol, currentPrice);
	}

	public void addTickerSymbols(List<String> tickerSymbols) {
		tickerSymbols.stream()
			.filter(tickerSymbol -> !currentPriceMap.containsKey(tickerSymbol))
			.forEach(tickerSymbol -> currentPriceMap.put(tickerSymbol, 0L));
	}

	public void addPortfolioSubscription(PortfolioSubscription subscription) {
		portfolioSubscriptions.remove(subscription);
		portfolioSubscriptions.add(subscription);
	}

	// currentPriceMap에 있는 종목들의 종목 현재가 시세를 갱신하고 클라이언트에게 전파한다
	@Scheduled(fixedRate = 2000L)
	public void publishCurrentPrice() {
		currentPriceMap.keySet().parallelStream().forEach(tickerSymbol -> {
			if (!redisService.hasCurrentPrice(tickerSymbol)) {
				scheduler.addRequest(createCurrentPriceRequest(tickerSymbol));
			} else {
				scheduler.addRequest(() -> messagingTemplate.convertAndSend(SUBSCRIBE_CURRENT_PRICE + tickerSymbol,
					currentPriceMap.get(tickerSymbol)));
			}
		});
		//
		// for (PortfolioSubscription subscription : portfolioSubscriptions) {
		// 	for (String tickerSymbol : subscription.getTickerSymbols()) {
		// 		portfolioStockService.readMyPortfolioStocks();
		// 		messagingTemplate.convertAndSend(formatSubscribeDestination(subscription.getPortfolioId(), tickerSymbol),
		// 			currentPriceMap.get(tickerSymbol));
		// 	}
		// }
	}
	//
	// private String formatSubscribeDestination(Long portfolioId, String tickerSymbol) {
	// 	return String.format(SUBSCRIBE_CURRENT_PRICE_FORMAT, portfolioId, tickerSymbol);
	// }

	private Runnable createCurrentPriceRequest(final String tickerSymbol) {
		return () -> {
			CurrentPriceResponse response = readRealTimeCurrentPrice(tickerSymbol);
			currentPriceMap.put(response.getTickerSymbol(), response.getCurrentPrice());
			redisService.setCurrentPrice(response.getTickerSymbol(), response.getCurrentPrice());
			messagingTemplate.convertAndSend(SUBSCRIBE_CURRENT_PRICE + tickerSymbol,
				currentPriceMap.get(tickerSymbol));
		};
	}
}
