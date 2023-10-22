package codesquad.fineants.domain.portfolio;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.fineants.domain.member.Member;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

	boolean existsByNameAndMember(String name, Member member);

	Slice<Portfolio> findAllByMemberIdOrderByIdDesc(Long memberId, Pageable pageable);
}
