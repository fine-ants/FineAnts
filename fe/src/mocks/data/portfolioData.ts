export const successfulPortfolioData = {
  code: 200,
  status: "OK",
  message: "포트폴리오 목록 조회가 완료되었습니다",
  data: {
    portfolios: [
      {
        id: 3,
        securitiesFirm: "토스",
        name: "엘리엇파동12345ABC",
        budget: 1000000,
        totalGain: 100000,
        totalGainRate: 10,
        dailyGain: 100000,
        dailyGainRate: 10,
        expectedMmonthlyDividend: 20000,
        numShares: 9,
      },
      {
        id: 2,
        name: "롱숏롱숏",
        budget: 1000000,
        totalGain: 100000,
        totalGainRate: 10,
        dailyGain: 100000,
        dailyGainRate: 10,
        expectedMmonthlyDividend: 20000,
        numShares: 3,
      },
      {
        id: 1,
        securitiesFirm: "토스",
        name: "물린게 아니라 장기투자",
        budget: 1000000,
        totalGain: 100000,
        totalGainRate: 10,
        dailyGain: 100000,
        dailyGainRate: 10,
        expectedMmonthlyDividend: 20000,
        numShares: 12,
      },
    ],
    hasNext: false,
    nextCursor: null,
  },
};

export const successfulPortfolioDetailsData = {
  code: 200,
  status: "OK",
  message: "포트폴리오 상세 정보 및 포트폴리오 종목 목록 조회가 완료되었습니다",
  data: null,
};

//TODO: api portfolios로 가져오는 데이터의 값이랑 다른 상태라 상의후에 통일해야함 포스트맨 api에는 value와 fill이 없음

export const successfulPortfolioAddData = {
  code: 200,
  status: "OK",
  message: "포트폴리오가 추가되었습니다",
  data: null,
};

export const successfulPortfolioEditData = {
  code: 200,
  status: "OK",
  message: "포트폴리오가 수정되었습니다",
  data: null,
};

export const successfulPortfolioDeleteData = {
  code: 200,
  status: "OK",
  message: "포트폴리오 삭제가 완료되었습니다",
  data: null,
};
