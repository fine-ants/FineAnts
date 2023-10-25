package codesquad.fineants.elasticsearch.search.util;

import java.util.List;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.WildcardQueryBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

import codesquad.fineants.elasticsearch.search.SearchRequestDTO;
import io.jsonwebtoken.lang.Collections;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class SearchUtil {

	private SearchUtil() {

	}

	public static org.elasticsearch.action.search.SearchRequest buildSearchRequest(final String indexName,
		final SearchRequestDTO dto) {
		try {
			SearchSourceBuilder builder = new SearchSourceBuilder()
				.postFilter(getQueryBuilder(dto));

			if (dto.getSortBy() != null) {
				builder = builder.sort(
					dto.getSortBy(),
					dto.getOrder() != null ? dto.getOrder() : SortOrder.ASC
				);
			}

			org.elasticsearch.action.search.SearchRequest request = new org.elasticsearch.action.search.SearchRequest(
				indexName);
			request.source(builder);

			return request;
		} catch (final Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static QueryBuilder getQueryBuilder(final SearchRequestDTO dto) {
		if (dto == null) {
			return null;
		}

		final List<String> fields = dto.getFields();
		if (Collections.isEmpty(fields)) {
			return null;
		}
		String wildcardSearchTerm = "*" + dto.getSearchTerm() + "*";
		if (fields.size() > 1) {
			BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
			fields.forEach(field -> {
				queryBuilder.should(new WildcardQueryBuilder(field, wildcardSearchTerm));
			});
			return queryBuilder;
		}

		return fields.stream()
			.findFirst()
			.map(field -> QueryBuilders.boolQuery().should(new WildcardQueryBuilder(field, wildcardSearchTerm)))
			.orElse(null);
	}
}
