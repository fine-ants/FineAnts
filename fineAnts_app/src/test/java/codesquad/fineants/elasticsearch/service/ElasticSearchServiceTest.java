package codesquad.fineants.elasticsearch.service;

import static org.assertj.core.api.Assertions.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import org.assertj.core.util.Lists;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.ActiveProfiles;

import codesquad.fineants.elasticsearch.document.StockSearch;
import codesquad.fineants.elasticsearch.repository.StockSearchRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ActiveProfiles("test")
@SpringBootTest
class ElasticSearchServiceTest {

	@Autowired
	private ElasticSearchService service;

	@Autowired
	private StockSearchRepository repository;

	@Autowired
	private RestHighLevelClient client;

	@AfterEach
	void tearDown() {
		service.deleteIndex("stocksearch");
	}

	@DisplayName("tsv 파일로부터 데이터를 추출하여 엘라스틱 서치 컨테이너에 벌크 insert 한다")
	@Test
	void bulkInsertFromTSV() throws IOException {
		// given
		InputStream inputStream = new ClassPathResource("stocks.tsv").getInputStream();
		String indexName = "stocksearch";
		// when
		service.bulkInsertFromTsv(inputStream, indexName);
		// then
		Iterable<StockSearch> stockSearches = repository.findAll();
		ArrayList<StockSearch> result = Lists.newArrayList(stockSearches);
		log.info("result size is : {}", result.size());
		assertThat(result).isNotEmpty();
	}

	@DisplayName("종목 데이터를 초기화한다")
	@Test
	void clear() throws IOException {
		// given
		String indexName = "stocksearch";
		// when
		service.deleteIndex(indexName);
		// then
		boolean exists = client.indices().exists(new GetIndexRequest(indexName), RequestOptions.DEFAULT);
		assertThat(exists).isFalse();
	}
}
