package codesquad.fineants.elasticsearch.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.SearchHit;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import codesquad.fineants.elasticsearch.document.StockSearch;
import codesquad.fineants.elasticsearch.helper.Indices;
import codesquad.fineants.elasticsearch.search.SearchRequestDTO;
import codesquad.fineants.elasticsearch.search.util.SearchUtil;
import codesquad.fineants.elasticsearch.service.response.StockSearchItem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class StockService {
	private final ObjectMapper MAPPER;
	private final RestHighLevelClient client;

	public List<StockSearchItem> search(final SearchRequestDTO dto) {
		final SearchRequest request = SearchUtil.buildSearchRequest(Indices.STOCK_INDEX, dto);

		if (request == null) {
			log.error("Failed to build search request");
			return Collections.emptyList();
		}

		try {
			final SearchResponse response = client.search(request, RequestOptions.DEFAULT);
			final SearchHit[] searchHits = response.getHits().getHits();
			final List<StockSearch> stocks = new ArrayList<>(searchHits.length);
			for (SearchHit hit : searchHits) {
				stocks.add(MAPPER.readValue(hit.getSourceAsString(), StockSearch.class));
			}

			return stocks.stream()
				.map(StockSearchItem::from)
				.collect(Collectors.toList());
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			return Collections.emptyList();
		}
	}
}
