package codesquad.fineants.spring.api.kis;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import codesquad.fineants.spring.api.kis.client.KisClient;
import codesquad.fineants.spring.api.kis.manager.KisAccessTokenManager;
import codesquad.fineants.spring.api.kis.response.CurrentPriceResponse;
import codesquad.fineants.spring.api.portfolio_stock.PortfolioStockService;
import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioHoldingsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class KisService {

	private static final String SUBSCRIBE_CURRENT_PRICE = "/sub/currentPrice/";
	private static final String SUBSCRIBE_PORTFOLIO_HOLDING_FORMAT = "/sub/portfolio/%d/currentPrice/%s";
	private static final Map<String, Long> currentPriceMap = new ConcurrentHashMap<>();
	private static final Set<PortfolioSubscription> portfolioSubscriptions = new HashSet<>();
	private final KisClient kisClient;
	private final KisRedisService redisService;
	private final KisClientScheduler scheduler;
	private final SimpMessagingTemplate messagingTemplate;
	private final PortfolioStockService portfolioStockService;
	private final KisAccessTokenManager manager;

	// 제약조건 : kis 서버에 1초당 최대 5건, TR간격 0.1초 이하면 안됨
	public CurrentPriceResponse readRealTimeCurrentPrice(String tickerSymbol) {
		Map<String, String> output = (Map<String, String>)kisClient.readRealTimeCurrentPrice(tickerSymbol,
			manager.createAuthorization()).get("output");
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

	private Runnable createCurrentPriceRequest(final String tickerSymbol) {
		return () -> {
			CurrentPriceResponse response = readRealTimeCurrentPrice(tickerSymbol);
			currentPriceMap.put(response.getTickerSymbol(), response.getCurrentPrice());
			redisService.setCurrentPrice(response.getTickerSymbol(), response.getCurrentPrice());
			messagingTemplate.convertAndSend(SUBSCRIBE_CURRENT_PRICE + tickerSymbol,
				currentPriceMap.get(tickerSymbol));
		};
	}

	@Scheduled(fixedRate = 5000L)
	public void publishPortfolioDetail() {
		currentPriceMap.keySet().parallelStream().forEach(tickerSymbol -> {
			if (!redisService.hasCurrentPrice(tickerSymbol)) {
				scheduler.addRequest(createCurrentPriceRequest(tickerSymbol));
			} else {
				scheduler.addRequest(() -> messagingTemplate.convertAndSend(SUBSCRIBE_CURRENT_PRICE + tickerSymbol,
					currentPriceMap.get(tickerSymbol)));
			}
		});

		for (PortfolioSubscription subscription : portfolioSubscriptions) {
			if (!checkCurrentPriceMap(subscription.getTickerSymbols())) {
				continue;
			}
			PortfolioHoldingsResponse response = portfolioStockService.readMyPortfolioStocks(
				subscription.getPortfolioId(), currentPriceMap);
			for (String tickerSymbol : subscription.getTickerSymbols()) {
				String destination = String.format(SUBSCRIBE_PORTFOLIO_HOLDING_FORMAT, subscription.getPortfolioId(),
					tickerSymbol);
				scheduler.addRequest(() -> messagingTemplate.convertAndSend(destination, response));
			}
		}
	}

	private boolean checkCurrentPriceMap(List<String> tickerSymbols) {
		return tickerSymbols.stream()
			.noneMatch(tickerSymbol -> currentPriceMap.getOrDefault(tickerSymbol, 0L) == 0L);
	}
}
