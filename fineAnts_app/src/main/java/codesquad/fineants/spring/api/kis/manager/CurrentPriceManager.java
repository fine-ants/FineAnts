package codesquad.fineants.spring.api.kis.manager;

import java.time.Duration;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import codesquad.fineants.spring.api.kis.response.CurrentPriceResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class CurrentPriceManager {
	private static final String pattern = "cp:*";
	private static final String format = "cp:%s";
	private static final Duration duration = Duration.ofMinutes(1);
	private final RedisTemplate<String, String> redisTemplate;

	public void addKey(String tickerSymbol) {
		redisTemplate.opsForValue().set(String.format(format, tickerSymbol), "0", duration);
	}

	public void addCurrentPrice(CurrentPriceResponse response) {
		redisTemplate.opsForValue()
			.set(String.format(format, response.getTickerSymbol()), String.valueOf(response.getCurrentPrice()),
				duration);
	}

	public Long getCurrentPrice(String tickerSymbol) {
		String currentPrice = redisTemplate.opsForValue().get(String.format(format, tickerSymbol));
		if (currentPrice == null || currentPrice.equals("0")) {
			return 0L;
		}
		return Long.valueOf(currentPrice);
	}

	public boolean hasCurrentPrice(String tickerSymbol) {
		String currentPrice = redisTemplate.opsForValue().get(String.format(format, tickerSymbol));
		return currentPrice != null && !currentPrice.equals("0");
	}

	public boolean hasKey(String tickerSymbol) {
		return Boolean.TRUE.equals(redisTemplate.hasKey(String.format(format, tickerSymbol)));
	}

	public Set<String> keys() {
		Set<String> keys = redisTemplate.keys(pattern);
		if (keys == null) {
			Collections.emptySet();
		}
		return Objects.requireNonNull(keys).stream()
			.map(key -> key.replace("cp:", ""))
			.collect(Collectors.toSet());
	}
}
