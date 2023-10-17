import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

import styled from "styled-components";

export default function DashboardPage() {
  return (
    <StyledDashboardPage>
      <Header />
      <Main>
        <MainColorBackground />
        <CurrentValueContainer>
          <TotalMainContentWrapper>
            <MainText>총 평가 금액</MainText>
            <MainText>2,540,000 ₩</MainText>
          </TotalMainContentWrapper>
          <TotalSubContentWrapper>
            <SubText>총 투자 금액</SubText>
            <SubText>1,273,000 ₩</SubText>
            <SubText></SubText>
          </TotalSubContentWrapper>
          <TotalSubContentWrapper>
            <SubText>총 손익 </SubText>
            <SubText>+ 1,500,000</SubText>
            <SubText>+ 100%</SubText>
          </TotalSubContentWrapper>
          <TotalSubContentWrapper>
            <SubText>연 배당금</SubText>
            <SubText>₩ 200,000</SubText>
            <SubText>+ 10%</SubText>
          </TotalSubContentWrapper>
        </CurrentValueContainer>
        <CurrentValueChartContainer>
          <PieChart />
          <LineChart />
        </CurrentValueChartContainer>
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

const CurrentValueContainer = styled.div`
  width: 1440px;
  height: 144px;
  display: flex;
  gap: 24px;
  position: absolute;
  top: 112px;
  padding: 0 80px;
  z-index: 3;
`;

const TotalMainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  height: 100%;
`;

const MainText = styled.div`
  font-size: 54px;
  font-weight: bold;
`;

const TotalSubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  height: 100%;
`;

const SubText = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  height: 100%;
`;

const CurrentValueChartContainer = styled.div`
  width: 1440px;
  height: 436px;
  padding: 0 80px;
  display: flex;
  gap: 54px;
  position: absolute;
  z-index:;
  bottom: 72px;
`;

const PieChart = styled.div`
  width: 460px;
  height: 384px;
  background-color: #d6d3d3;
`;

const LineChart = styled.div`
  width: 688px;
  height: 384px;
  background-color: #d6d3d3;
`;
