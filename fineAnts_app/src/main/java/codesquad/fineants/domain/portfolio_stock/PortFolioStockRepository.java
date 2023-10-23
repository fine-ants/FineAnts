package codesquad.fineants.domain.portfolio_stock;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PortFolioStockRepository extends JpaRepository<PortfolioStock, Long> {

	int deleteAllByPortfolioId(Long portFolioId);

	List<PortfolioStock> findAllByPortfolioId(Long portfolioId);

}
