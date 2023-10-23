import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function PortfolioPage() {
  const { id } = useParams();

  return (
    <StyledPortfolioPage>
      <ChartArea>차트</ChartArea>
      <PortfolioArea>
        <StatusArea>상태</StatusArea>
        <StocksArea>종목</StocksArea>
      </PortfolioArea>
    </StyledPortfolioPage>
  );
}

const StyledPortfolioPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 16px;
`;

const ChartArea = styled.div`
  width: 35%;
  height: 100%;
  border: 1px solid black;
`;

const PortfolioArea = styled.div`
  width: 65%;
  height: 100%;
  border: 1px solid black;
`;

const StatusArea = styled.div`
  width: 100%;
  height: 50%;
  border: 1px solid black;
`;

const StocksArea = styled.div`
  width: 100%;
  height: 50%;
  border: 1px solid black;
`;
