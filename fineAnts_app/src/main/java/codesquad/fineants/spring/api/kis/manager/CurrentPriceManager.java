package codesquad.fineants.spring.api.kis.manager;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class CurrentPriceManager {
	private Map<String, Long> currentPriceMap;

	public void addCurrentPrice(String tickerSymbol) {
		currentPriceMap.putIfAbsent(tickerSymbol, 0L);
	}

	public void addCurrentPrice(String tickerSymbol, Long currentPrice) {
		currentPriceMap.put(tickerSymbol, currentPrice);
	}

	public Long getCurrentPrice(String tickerSymbol) {
		return currentPriceMap.getOrDefault(tickerSymbol, 0L);
	}
}
