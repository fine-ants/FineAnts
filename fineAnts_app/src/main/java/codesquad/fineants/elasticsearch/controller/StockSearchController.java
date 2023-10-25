package codesquad.fineants.elasticsearch.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codesquad.fineants.elasticsearch.search.SearchRequestDTO;
import codesquad.fineants.elasticsearch.service.StockService;
import codesquad.fineants.elasticsearch.service.response.StockSearchItem;
import codesquad.fineants.spring.api.response.ApiResponse;
import codesquad.fineants.spring.api.success.code.StockSuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
@RestController
public class StockSearchController {

	private final StockService service;

	@PostMapping("/search")
	public ApiResponse<List<StockSearchItem>> search(@RequestBody final SearchRequestDTO dto) {
		log.info("종목 검색 요청 : dto={}", dto);
		return ApiResponse.success(StockSuccessCode.OK_SEARCH_STOCKS, service.search(dto));
	}
}
