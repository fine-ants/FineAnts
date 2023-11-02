package codesquad.fineants.domain.portfolio_gain_history;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PortfolioGainHistoryRepository extends JpaRepository<PortfolioGainHistory, Long> {
	@Query("select p from PortfolioGainHistory p where p.portfolio.id = :portfolioId and p.createAt <= :createAt order by p.createAt desc")
	Optional<PortfolioGainHistory> findFirstByPortfolioAndCreateAtIsLessThanEqualOrderByCreateAtDesc(
		Long portfolioId, LocalDateTime createAt);
}
