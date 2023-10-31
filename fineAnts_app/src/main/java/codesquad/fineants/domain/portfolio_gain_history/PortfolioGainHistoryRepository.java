package codesquad.fineants.domain.portfolio_gain_history;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.fineants.domain.portfolio.Portfolio;

public interface PortfolioGainHistoryRepository extends JpaRepository<PortfolioGainHistory, Long> {
	Optional<PortfolioGainHistory> findFirstByPortfolioAndCreateAtIsLessThanEqualOrderByCreateAtDesc(
		Portfolio portfolio, LocalDateTime createAt);
}
