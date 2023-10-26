import { HTTPSTATUS } from "@api/types";

export const successfulPortfolioData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "카테고리 목록 조회를 성공하였습니다",
  data: [
    { name: "내꿈은워렌버핏", value: 2500000, fill: "#0088FE" },
    { name: "단타왕", value: 3235500, fill: "#00C49F" },
    { name: "물린게아니고장기투자", value: 1573500, fill: "#FFBB28" },
  ],
};

export const successfulPortfolioDetailsData = {
  code: 200,
  status: "OK",
  message: "포트폴리오 상세 정보 및 포트폴리오 종목 목록 조회가 완료되었습니다",
  data: {
    portfolioDetails: {
      id: 3,
      name: "내꿈은 워렌버핏",
      budget: 1000000,
      targetGain: 1500000,
      targetReturnRate: 50,
      maximumLoss: 900000,
      maximumLossRate: 10,
      currentValuation: 600000, // newly added!
      investedAmount: 500000,
      totalGain: 100000,
      totalGainRate: 10,
      dailyGain: 100000,
      dailyGainRate: 10,
      balance: 500000,
      totalAnnualDividend: 15000,
      totalAnnualDividendYield: 3,
      annualInvestmentDividendYield: 3,
      provisionalLossBalance: 0,
    },
    portfolioHoldings: [
      {
        companyName: "삼성전자보통주",
        tickerSymbol: "005930",
        portfolioHoldingId: 1,
        currentValuation: 600000,
        currentPrice: 60000,
        averageCostPerShare: 50000.0,
        numShares: 10,
        dailyChange: 10000,
        dailyChangeRate: 10,
        totalGain: 100000,
        totalReturnRate: 16,
        annualDividend: 6000,
        annualDividendYield: 10,

        purchaseHistory: [
          {
            id: 3,
            purchaseDate: "2023-10-23T15:00:00",
            numShares: 3,
            purchasePricePerShare: 50000.0,
            memo: null,
          },
          {
            id: 2,
            purchaseDate: "2023-10-23T14:00:00",
            numShares: 3,
            purchasePricePerShare: 50000.0,
            memo: "더살거야",
          },
          {
            id: 1,
            purchaseDate: "2023-10-23T10:00:00",
            numShares: 4,
            purchasePricePerShare: 50000.0,
            memo: "첫구매",
          },
        ],
      },
      {
        companyName: "NAVER",
        tickerSymbol: "035420",
        portfolioHoldingId: 2,
        currentValuation: 1475200,
        currentPrice: 184400,
        averageCostPerShare: 150000.0,
        numShares: 8,
        dailyChange: 4600,
        dailyChangeRate: 2.5,
        totalGain: 275200,
        totalReturnRate: 22.93,
        annualDividend: 922,
        annualDividendYield: 0.5,

        purchaseHistory: [
          {
            id: 3,
            purchaseDate: "2023-10-23T15:00:00",
            numShares: 2,
            purchasePricePerShare: 50000.0,
            memo: null,
          },
          {
            id: 2,
            purchaseDate: "2023-10-23T14:00:00",
            numShares: 3,
            purchasePricePerShare: 50000.0,
            memo: "더살거야",
          },
          {
            id: 1,
            purchaseDate: "2023-10-23T10:00:00",
            numShares: 3,
            purchasePricePerShare: 50000.0,
            memo: "첫구매",
          },
        ],
      },
    ],
  },
};

//TODO: api portfolios로 가져오는 데이터의 값이랑 다른 상태라 상의후에 통일해야함 포스트맨 api에는 value와 fill이 없음
