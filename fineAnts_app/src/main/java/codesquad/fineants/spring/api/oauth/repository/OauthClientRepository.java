package codesquad.fineants.spring.api.oauth.repository;

import codesquad.fineants.spring.api.oauth.client.OauthClient;

public interface OauthClientRepository {
	OauthClient findOneBy(String providerName);
}
