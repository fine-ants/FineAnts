package codesquad.fineants.spring.api.kis;

import java.util.Map;

import org.springframework.stereotype.Service;

import codesquad.fineants.spring.api.kis.client.OauthKisClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class KisService {

	private final OauthKisClient oauthKisClient;

	public Map<String, Object> approval() {
		return oauthKisClient.approval();
	}
}
