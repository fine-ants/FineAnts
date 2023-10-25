package codesquad.fineants.elasticsearch.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import codesquad.fineants.elasticsearch.document.StockSearch;
import codesquad.fineants.elasticsearch.repository.StockSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ElasticSearchService {

	private static final String TAB = "\t";

	private static final String STOCK_SEARCh_INDEX = "stocksearch";

	private static final String STOCK_TSV = "stocks.tsv";

	private final RestHighLevelClient client;

	private final StockSearchRepository repository;

	// 서버 실행시 종목 데이터를 elasticSearch 저장소에 초기화합니다.
	@PostConstruct
	private void init() {
		Iterator<StockSearch> iterator = repository.findAll().iterator();
		if (!iterator.hasNext()) {
			String tsvFilePath;
			try {
				tsvFilePath = new ClassPathResource(STOCK_TSV).getFile().getPath();
			} catch (IOException e) {
				log.error(e.getMessage(), e);
				throw new RuntimeException(e);
			}
			bulkInsertFromTsv(tsvFilePath, STOCK_SEARCh_INDEX);
			log.info("success bulk insert");
			return;
		}
		log.info("exist stocks");
	}

	public void bulkInsertFromTsv(String tsvFilePath, String indexName) {
		BulkRequest request = new BulkRequest();
		try (BufferedReader br = new BufferedReader(new FileReader(tsvFilePath))) {
			String[] columnHeaders = br.readLine().split(TAB);
			log.info("columnHeaders : {}", Arrays.toString(columnHeaders));
			String line;
			long id = 0L;
			while ((line = br.readLine()) != null) {
				String[] fields = line.split(TAB);
				Map<String, Object> document = new HashMap<>();
				document.put("id", ++id);
				for (int i = 0; i < columnHeaders.length; i++) {
					document.put(columnHeaders[i], fields[i]);
				}
				request.add(new IndexRequest(indexName).source(document));
			}
		} catch (IOException | ArrayIndexOutOfBoundsException e) {
			log.error(e.getMessage(), e);
			return;
		}

		try {
			BulkResponse response = client.bulk(request, RequestOptions.DEFAULT);
			if (response.hasFailures()) {
				log.error("failed bulk insert from tsv file");
			}
			log.info("success bulk insert from tsv file");
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void deleteIndex(String indexName) {
		try {
			if (!client.indices().exists(new GetIndexRequest(indexName), RequestOptions.DEFAULT)) {
				return;
			}
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			return;
		}

		DeleteIndexRequest request = new DeleteIndexRequest(indexName);
		try {
			client.indices().delete(request, RequestOptions.DEFAULT);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
