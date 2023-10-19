import styled from "styled-components";
import { addComma } from "../../utils/addComma";

type Portfolio = {
  id: number;
  symbol: string;
  name: string;
  budget: number;
  total: {
    gain: number;
    return: number;
  };
  daily: {
    gain: number;
    return: number;
  };
  currentMonthDividend: number;
  numberOfShares: number;
};

const SAMPLE_PORTFOLIO = [
  {
    id: 0,
    symbol:
      "https://framerusercontent.com/images/y7135TGP0TiQ7gtLbQ0IrWOzww.jpg",
    name: "물린게아니라장기투자",
    budget: 1000000,
    total: {
      gain: 10,
      return: 100000,
    },
    daily: {
      gain: 10,
      return: 100000,
    },
    currentMonthDividend: 20000,
    numberOfShares: 12,
  },
  {
    id: 1,
    symbol:
      "https://framerusercontent.com/images/y7135TGP0TiQ7gtLbQ0IrWOzww.jpg",
    name: "롱숏롱숏",
    budget: 1000000,
    total: {
      gain: -5,
      return: -50000,
    },
    daily: {
      gain: -5,
      return: -50000,
    },
    currentMonthDividend: 1000,
    numberOfShares: 1,
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
  const onClickPortfolio = () => {
    // TODO : 개별 portfolio page가 구현된다면 page 이동 구현 예정

    console.log(portfolio.id);
  };

  return (
    <tr onClick={onClickPortfolio}>
      <td>
        <SymbolImg src={portfolio.symbol} />
        <span>{portfolio.name}</span>
      </td>
      <td>{addComma(portfolio.budget)}</td>
      <td>
        <div>{portfolio.total.gain}%</div>
        <div>{addComma(portfolio.total.return)}</div>
      </td>
      <td>
        <div>{portfolio.daily.gain}%</div>
        <div>{addComma(portfolio.daily.return)}</div>
      </td>
      <td>{addComma(portfolio.currentMonthDividend)}</td>
      <td>{addComma(portfolio.numberOfShares)}</td>
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
