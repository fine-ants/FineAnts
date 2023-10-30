package codesquad.fineants.spring.api.kis;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class StockPriceManager {

	private final KisService kisService;
	private final KisClientScheduler scheduler;

	private final KisRedisService redisService;

}
