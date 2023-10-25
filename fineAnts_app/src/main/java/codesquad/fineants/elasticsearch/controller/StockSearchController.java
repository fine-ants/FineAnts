package codesquad.fineants.elasticsearch.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codesquad.fineants.elasticsearch.document.StockSearch;
import codesquad.fineants.elasticsearch.search.SearchRequestDTO;
import codesquad.fineants.elasticsearch.service.StockService;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/stocksearch")
@RequiredArgsConstructor
@RestController
public class StockSearchController {

	private final StockService service;

	@PostMapping("/search")
	public List<StockSearch> search(@RequestBody final SearchRequestDTO dto) {
		return service.search(dto);
	}
}
