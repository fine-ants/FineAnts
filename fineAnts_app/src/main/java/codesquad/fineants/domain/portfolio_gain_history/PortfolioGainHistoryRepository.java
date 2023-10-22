package codesquad.fineants.domain.portfolio_gain_history;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioGainHistoryRepository extends JpaRepository<PortfolioGainHistory, Long> {
	Optional<PortfolioGainHistory> findFirstByCreateAtIsLessThanEqualOrderByCreateAtDesc(LocalDateTime createAt);
}
