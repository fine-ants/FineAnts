import usePortfolioDetailsQuery from "@api/portfolio/queries/usePortfolioDetailsQuery";
import plusIcon from "@assets/icons/plus.svg";
import PortfolioHoldingsTable from "@components/Portfolio/PortfolioHoldingsTable";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function PortfolioPage() {
  const { id } = useParams();

  const { data: portfolio, isLoading: isPortfolioDetailsLoading } =
    usePortfolioDetailsQuery(Number(id));

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

      <main>
        <LeftPanel>
          {/* Holdings Composition Chart */}
          {/* Dividend Bar Chart */}
          {/* Sector Spectrum Graph */}
        </LeftPanel>

        <RightPanel>
          <PortfolioOverviewContainer>{/*  */}</PortfolioOverviewContainer>

          <PortfolioHoldingsContainer>
            <header>
              <Typography variant="h6" component="h3">
                종목 목록
              </Typography>

              {/* TODO: onClick */}
              <Button
                variant="outlined"
                startIcon={<img src={plusIcon} alt="종목 추가" />}>
                <span>종목 추가</span>
              </Button>
            </header>

            <PortfolioHoldingsTable
              portfolioId={portfolioDetails.id}
              data={portfolioHoldings}
            />
          </PortfolioHoldingsContainer>
        </RightPanel>
      </main>

      {/* Footer */}
    </StyledPortfolioPage>
  );
}

const StyledPortfolioPage = styled(BasePage)``;

const LeftPanel = styled.div``;

const RightPanel = styled.div``;

const PortfolioOverviewContainer = styled.div``;

const PortfolioHoldingsContainer = styled.div`
  width: 850px;

  header {
    display: flex;
    justify-content: space-between;
  }
`;
