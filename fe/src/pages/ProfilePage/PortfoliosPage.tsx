import styled from "styled-components";
import { thousandsDelimiter } from "../../utils/thousandsDelimiter";

type Portfolio = {
  id: number;
  securitiesFirmImage: string;
  name: string;
  budget: number;
  totalGain: number;
  totalReturnRate: number;
  dailyGain: number;
  dailyReturnRate: number;
  expectedMonthlyDividend: number;
  numShares: number;
};

const SAMPLE_PORTFOLIO = [
  {
    id: 0,
    securitiesFirmImage:
      "https://framerusercontent.com/images/y7135TGP0TiQ7gtLbQ0IrWOzww.jpg",
    name: "물린게아니라장기투자",
    budget: 1000000,
    totalGain: 10,
    totalReturnRate: 100000,
    dailyGain: 10,
    dailyReturnRate: 100000,
    expectedMonthlyDividend: 20000,
    numShares: 12,
  },
  {
    id: 1,
    securitiesFirmImage:
      "https://framerusercontent.com/images/y7135TGP0TiQ7gtLbQ0IrWOzww.jpg",
    name: "롱숏롱숏",
    budget: 1000000,
    totalGain: -5,
    totalReturnRate: 50000,
    dailyGain: -5,
    dailyReturnRate: 50000,
    expectedMonthlyDividend: 1000,
    numShares: 1,
  },
];

export default function PortfoliosPage() {
  return (
    <div>
      <PortfolioTable>
        <tbody>
          <tr>
            <th>이름</th>
            <th>투자 예산</th>
            <th>총 수익</th>
            <th>당일 손익</th>
            <th>당월 배당 예상금</th>
            <th>종목 개수</th>
          </tr>
          {SAMPLE_PORTFOLIO.map((portfolio) => (
            <PortfolioItem key={portfolio.id} portfolio={portfolio} />
          ))}
        </tbody>
      </PortfolioTable>
    </div>
  );
}

type Props = { portfolio: Portfolio };

function PortfolioItem({ portfolio }: Props) {
  const onPortfolioClick = () => {
    // TODO : 개별 portfolio page가 구현된다면 page 이동 구현 예정

    console.log(portfolio.id);
  };

  return (
    <tr onClick={onPortfolioClick}>
      <td>
        <SymbolImg src={portfolio.securitiesFirmImage} />
        <span>{portfolio.name}</span>
      </td>
      <td>{thousandsDelimiter(portfolio.budget)}</td>
      <td>
        <div>{portfolio.totalGain}%</div>
        <div>{thousandsDelimiter(portfolio.totalReturnRate)}</div>
      </td>
      <td>
        <div>{portfolio.dailyGain}%</div>
        <div>{thousandsDelimiter(portfolio.dailyReturnRate)}</div>
      </td>
      <td>{thousandsDelimiter(portfolio.expectedMonthlyDividend)}</td>
      <td>{thousandsDelimiter(portfolio.numShares)}</td>
    </tr>
  );
}

const SymbolImg = styled.img`
  width: 30px;
  height: 30px;
`;

const PortfolioTable = styled.table`
  width: 930px;
  border: 1px solid black;
  border-collapse: collapse;

  td:not(:first-child) {
    text-align: center;
  }
  td,
  th {
    border-bottom: 1px solid black;
  }
`;
