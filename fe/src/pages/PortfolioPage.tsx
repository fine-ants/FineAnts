import usePortfolioDetailsQuery from "@api/portfolio/queries/usePortfolioDetailsQuery";
import plusIcon from "@assets/icons/plus.svg";
import PortfolioHoldingsTable from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingsTable";
import PortfolioOverview from "@components/Portfolio/PortfolioOverview";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";
import SectorBar from "@components/Portfolio/SectorBar";
import DividendBarChart from "@components/Portfolio/DividendBarChart";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import HoldingsPieChart from "@components/Portfolio/HoldingsPieChart";

export default function PortfolioPage() {
  const { id } = useParams();

  const { data: portfolio, isLoading: isPortfolioDetailsLoading } =
    usePortfolioDetailsQuery(Number(id));

  const onAddHoldingButtonClick = () => {
    // TODO: Open search modal
  };

  // TODO: Handle loading
  if (isPortfolioDetailsLoading) {
    return <div>Loading</div>;
  }

  // TODO: Handle error
  if (!portfolio) {
    return <div>Error</div>;
  }

  const { portfolioDetails, portfolioHoldings } = portfolio;

  return (
    <StyledPortfolioPage>
      {/* Header */}
      <Header />
      <main style={{ display: "flex" }}>
        <LeftPanel>
          {/* Holdings Composition Chart */}
          {/* Dividend Bar Chart */}
          {/* Sector Spectrum Graph */}
          <HoldingsPieChart data={portfolioHoldings} />
          <DividendBarChart />
          <SectorBar />
        </LeftPanel>

        <RightPanel>
          <PortfolioOverviewContainer>
            <PortfolioOverview data={portfolioDetails} />
          </PortfolioOverviewContainer>

          <PortfolioHoldingsContainer>
            <header>
              <Typography variant="h6" component="h3">
                종목 목록
              </Typography>

              <AddHoldingButton
                variant="outlined"
                startIcon={<img src={plusIcon} alt="종목 추가" />}
                onClick={onAddHoldingButtonClick}>
                <Typography variant="button" sx={{ color: "#2C2C2E" }}>
                  종목 추가
                </Typography>
              </AddHoldingButton>
            </header>

            <PortfolioHoldingsTable
              portfolioId={portfolioDetails.id}
              data={portfolioHoldings}
            />
          </PortfolioHoldingsContainer>
        </RightPanel>
      </main>
      <Footer />
      {/* Footer */}
    </StyledPortfolioPage>
  );
}

const StyledPortfolioPage = styled(BasePage)``;

const LeftPanel = styled.div``;

const RightPanel = styled.div``;

const PortfolioOverviewContainer = styled.div``;

const PortfolioHoldingsContainer = styled(Box)`
  width: 988px;
  padding: 16px 24px 22px;
  box-shadow: 0px 0px 12px 0px #00000014;
  border-radius: 8px;

  header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
`;

const AddHoldingButton = styled(Button)`
  border: 1px solid #8e8e93;
  border-radius: 8px;
`;
