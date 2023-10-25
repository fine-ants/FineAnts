package codesquad.fineants.elasticsearch.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import codesquad.fineants.elasticsearch.document.StockSearch;

public interface StockSearchRepository extends ElasticsearchRepository<StockSearch, String> {
}
