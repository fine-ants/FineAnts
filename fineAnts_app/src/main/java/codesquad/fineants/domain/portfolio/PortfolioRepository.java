package codesquad.fineants.domain.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.fineants.domain.member.Member;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

	boolean existsByNameAndMember(String name, Member member);
}
