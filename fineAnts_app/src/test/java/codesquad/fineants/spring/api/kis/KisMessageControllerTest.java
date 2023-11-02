package codesquad.fineants.spring.api.kis;

import static org.assertj.core.api.Assertions.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.apache.tomcat.websocket.WsWebSocketContainer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import codesquad.fineants.spring.api.portfolio_stock.response.PortfolioHoldingsResponse;
import codesquad.fineants.spring.config.JpaAuditingConfiguration;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@MockBean(JpaAuditingConfiguration.class)
class KisMessageControllerTest {

	private static final String SUBSCRIBE_PORTFOLIO = "/sub/portfolio/";
	private static final String SEND_PORTFOLIO = "/pub/portfolio/";

	@Value("${local.server.port}")
	private int port;
	private String url;
	private CompletableFuture<PortfolioHoldingsResponse> completableFuture;

	@BeforeEach
	void init() {
		url = "ws://localhost:" + port + "/portfolio";
		completableFuture = new CompletableFuture<>();
	}

	@DisplayName("포트폴리오 구독에 대해서 발행 요청한다")
	@Test
	void publishPortfolioSubscription() throws ExecutionException, InterruptedException, TimeoutException {
		// given
		WebSocketStompClient stompClient = new WebSocketStompClient(
			new StandardWebSocketClient(new WsWebSocketContainer()));
		stompClient.setMessageConverter(new MappingJackson2MessageConverter());
		StompSession stompSession = stompClient.connect(url, new StompSessionHandlerAdapter() {
		}).get(1, TimeUnit.SECONDS);

		// when
		stompSession.subscribe(SUBSCRIBE_PORTFOLIO + 1, new CreatePortfolioHoldingResponseStompFrameHandler());
		stompSession.send(SEND_PORTFOLIO + 1, List.of("005930"));
		PortfolioHoldingsResponse response = completableFuture.get(10, TimeUnit.SECONDS);
		// then
		assertThat(response).isNotNull();
	}

	private List<Transport> createTransportClient() {
		List<Transport> transports = new ArrayList<>(1);
		transports.add(new WebSocketTransport(new StandardWebSocketClient()));
		return transports;
	}

	private class CreatePortfolioHoldingResponseStompFrameHandler implements StompFrameHandler {
		@Override
		public Type getPayloadType(StompHeaders stompHeaders) {
			return PortfolioHoldingsResponse.class;
		}

		@Override
		public void handleFrame(StompHeaders stompHeaders, Object o) {
			completableFuture.complete((PortfolioHoldingsResponse)o);
		}
	}

}
