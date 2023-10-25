package codesquad.fineants.domain.portfolio_stock;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PortFolioStockRepository extends JpaRepository<PortfolioHolding, Long> {

	int deleteAllByPortfolioId(Long portFolioId);

	List<PortfolioHolding> findAllByPortfolioId(Long portfolioId);

}
