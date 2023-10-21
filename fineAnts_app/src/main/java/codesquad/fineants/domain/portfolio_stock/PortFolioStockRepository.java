package codesquad.fineants.domain.portfolio_stock;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PortFolioStockRepository extends JpaRepository<PortFolioStock, Long> {

	int deleteAllByPortfolioId(Long portFolioId);

	List<PortFolioStock> findAllByPortfolioId(Long portfolioId);

}
