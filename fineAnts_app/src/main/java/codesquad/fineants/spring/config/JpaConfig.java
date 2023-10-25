package codesquad.fineants.spring.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import codesquad.fineants.elasticsearch.repository.StockSearchRepository;

@EnableJpaRepositories(excludeFilters = @ComponentScan.Filter(
	type = FilterType.ASSIGNABLE_TYPE,
	classes = {StockSearchRepository.class}),
	basePackages = {"codesquad"})
@Configuration
public class JpaConfig {
}
