import CurrentValues from "@components/Dashboard/CurrentValues";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

import styled from "styled-components";

import PortfolioPieChart from "../components/Dashboard/PortfolioPieChart";

export default function DashboardPage() {
  return (
    <StyledDashboardPage>
      <Header />
      <Main>
        <MainColorBackground />
        <CurrentValues />
        <CurrentChartContainer>
          <DateRangeSelector>1D 1W 1M 1Q 1Y All</DateRangeSelector>
          <ChartContainer>
            <PortfolioPieChart />
            <LineChart />
          </ChartContainer>
        </CurrentChartContainer>
      </Main>
      <Footer />
    </StyledDashboardPage>
  );
}

const StyledDashboardPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 1440px;
  height: 1024px;
  background-color: #ffffff;
  border: 1px solid #000000;
`;

const Main = styled.main`
  width: 100%;
  height: 828px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const MainColorBackground = styled.div`
  width: 1440px;
  height: 460px;
  background-color: #f5fbf2;
  position: absolute;
  z-index: 0;
`;

const CurrentChartContainer = styled.div`
  width: 1202px;
  height: 428px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  position: absolute;
  bottom: 72px;
  padding: 0 80px;
  z-index: 3;
`;

const DateRangeSelector = styled.div`
  width: 256px;
  height: 32px;
  margin-left: auto;
  color: white;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d6d3d3;
`;

const ChartContainer = styled.div`
  height: 384px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 54px;
`;

const LineChart = styled.div`
  width: 688px;
  height: 384px;
  background-color: #d6d3d3;
`;
