package codesquad.fineants.spring.api.portfolio;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.fineants.domain.member.Member;
import codesquad.fineants.domain.member.MemberRepository;
import codesquad.fineants.domain.oauth.support.AuthMember;
import codesquad.fineants.domain.portfolio.Portfolio;
import codesquad.fineants.domain.portfolio.PortfolioRepository;
import codesquad.fineants.spring.api.errors.errorcode.MemberErrorCode;
import codesquad.fineants.spring.api.errors.errorcode.PortfolioErrorCode;
import codesquad.fineants.spring.api.errors.exception.BadRequestException;
import codesquad.fineants.spring.api.errors.exception.ConflictException;
import codesquad.fineants.spring.api.errors.exception.NotFoundResourceException;
import codesquad.fineants.spring.api.portfolio.request.PortfolioCreateRequest;
import codesquad.fineants.spring.api.portfolio.response.PortFolioCreateResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PortFolioService {

	private final PortfolioRepository portfolioRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public PortFolioCreateResponse addPortFolio(PortfolioCreateRequest request, AuthMember authMember) {
		validateTargetGainIsEqualLessThanBudget(request.getTargetGain(), request.getBudget());
		validateMaximumLossIsEqualGraterThanBudget(request.getMaximumLoss(), request.getBudget());

		Member member = memberRepository.findById(authMember.getMemberId())
			.orElseThrow(() -> new NotFoundResourceException(MemberErrorCode.NOT_FOUND_MEMBER));

		validateUniquePortfolioName(request.getName(), member);
		Portfolio portfolio = request.toEntity(member);
		return PortFolioCreateResponse.from(portfolioRepository.save(portfolio));
	}

	private void validateTargetGainIsEqualLessThanBudget(Long targetGain, Long budget) {
		if (targetGain <= budget) {
			throw new BadRequestException(PortfolioErrorCode.TARGET_GAIN_LOSS_IS_EQUAL_LESS_THAN_BUDGET);
		}
	}

	private void validateMaximumLossIsEqualGraterThanBudget(Long maximumLoss, Long budget) {
		if (maximumLoss >= budget) {
			throw new BadRequestException(PortfolioErrorCode.MAXIMUM_LOSS_IS_EQUAL_GREATER_THAN_BUDGET);
		}
	}

	private void validateUniquePortfolioName(String name, Member member) {
		if (portfolioRepository.existsByNameAndMember(name, member)) {
			throw new ConflictException(PortfolioErrorCode.DUPLICATE_NAME);
		}
	}
}
