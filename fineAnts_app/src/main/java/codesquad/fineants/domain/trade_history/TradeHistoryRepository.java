package codesquad.fineants.domain.trade_history;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeHistoryRepository extends JpaRepository<TradeHistory, Long> {

	int deleteAllByPortFolioStockIdIn(List<Long> portfolioId);

	List<TradeHistory> findAllByPortFolioStockId(Long portfolioStockId);
}
