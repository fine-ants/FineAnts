package codesquad.fineants.spring.api.kis;

import org.springframework.stereotype.Service;

import codesquad.fineants.spring.api.kis.client.OauthKisClient;
import codesquad.fineants.spring.api.kis.response.OauthKisApprovalResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class KisService {

	private final OauthKisClient oauthKisClient;

	public OauthKisApprovalResponse approval() {
		return oauthKisClient.approval();
	}
}
