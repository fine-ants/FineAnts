package codesquad.fineants.elasticsearch.search;

import java.util.List;

import org.elasticsearch.search.sort.SortOrder;

import lombok.Getter;

@Getter
public class SearchRequestDTO {
	private List<String> fields;
	private String searchTerm;
	private String sortBy;
	private SortOrder order;
}
