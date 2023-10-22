package codesquad.fineants.spring.api.kis;

import static codesquad.fineants.spring.api.kis.client.OauthKisClient.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import codesquad.fineants.spring.api.kis.client.KisWebSocketClientEndpoint;
import codesquad.fineants.spring.api.kis.client.OauthKisClient;
import codesquad.fineants.spring.api.kis.response.KisRealTimeSigningPriceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class KisService {

	private final OauthKisClient oauthKisClient;
	private final SimpMessagingTemplate messagingTemplate;
	private String approveKey;

	@PostConstruct
	private void init() {
		this.approveKey = approval();
	}

	public String approval() {
		log.info("approval call");
		return oauthKisClient.approval();
	}

	public void readRealTimeSigningPrice(String stockCode) {
		KisWebSocketClientEndpoint clientEndpoint;
		try {
			clientEndpoint = new KisWebSocketClientEndpoint(new URI(realTimeSigningPriceURI));
		} catch (URISyntaxException e) {
			throw new RuntimeException(e);
		}
		clientEndpoint.addMessageHandler(getMessageHandler());
		oauthKisClient.readRealTimeSigningPrice(approveKey, clientEndpoint, stockCode);
	}

	private KisWebSocketClientEndpoint.MessageHandler getMessageHandler() {
		return message -> {
			log.debug("메시지 수신 결과 : {}", message);
			List<String> stockInfos = Arrays.stream(message.split("[|\\\\^]"))
				.skip(3)
				.limit(3)
				.collect(Collectors.toList());
			if (!stockInfos.isEmpty()) {
				KisRealTimeSigningPriceResponse response = new KisRealTimeSigningPriceResponse(
					stockInfos);
				log.info("실시간 체결과 조회 결과 : {}", response);
				messagingTemplate.convertAndSend("/topic/realTimeSigningPrice", response);
			}
		};
	}
}
