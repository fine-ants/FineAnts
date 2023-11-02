import { PortfolioHolding } from "@api/portfolio";
import usePortfolioHoldingDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingDeleteMutation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLots from "./PortfolioHoldingLots";

export default function PortfolioHoldingRow({
  portfolioId,
  row,
}: {
  portfolioId: number;
  row: PortfolioHolding;
}) {
  const {
    companyName,
    tickerSymbol,
    portfolioHoldingId,
    currentValuation,
    currentPrice,
    averageCostPerShare,
    numShares,
    dailyChange,
    dailyChangeRate,
    totalGain,
    totalReturnRate,
    annualDividend,
    annualDividendYield,
    purchaseHistory,
  } = row;

  const { mutate: portfolioHoldingDeleteMutate } =
    usePortfolioHoldingDeleteMutation(portfolioId);

  const [isOpen, setIsOpen] = useState(false);

  const onDeleteClick = () => {
    portfolioHoldingDeleteMutate({ portfolioId, portfolioHoldingId });
  };

  return (
    <>
      <HoldingTableRow>
        <HoldingTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </HoldingTableCell>
        <HoldingTableCell component="th" scope="row">
          <Typography sx={{ fontSize: "1rem" }} component="h3">
            <Link
              to={`/portfolio/$${portfolioId}/holding/${portfolioHoldingId}`}>
              {companyName}
            </Link>
          </Typography>
          <Typography>{tickerSymbol}</Typography>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Amount>{currentValuation}</Amount>
          <Currency>KRW</Currency>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Amount>{currentPrice}</Amount>
          <Currency>KRW</Currency>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Amount>{averageCostPerShare}</Amount>
          <Currency>KRW</Currency>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Typography>{numShares}</Typography>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Typography>{dailyChangeRate}%</Typography>
          <Typography>{dailyChange}</Typography>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Typography>{totalReturnRate}%</Typography>
          <Typography>{totalGain}</Typography>
        </HoldingTableCell>
        <HoldingTableCell align="right">
          <Typography>{annualDividendYield}%</Typography>
          <Typography>{annualDividend}</Typography>
        </HoldingTableCell>
        {/* TODO: 종목 삭제 버튼 */}
        <div
          onClick={onDeleteClick}
          style={{ border: "1px solid black", cursor: "pointer" }}>
          삭제
        </div>
      </HoldingTableRow>
      <HoldingLotRow>
        <TableCell
          style={{ padding: "0 0 0 68.5px", border: "none" }}
          colSpan={9}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <PortfolioHoldingLots
              portfolioId={portfolioId}
              portfolioHoldingId={portfolioHoldingId}
              purchaseHistory={purchaseHistory}
            />
          </Collapse>
        </TableCell>
      </HoldingLotRow>
    </>
  );
}

const HoldingTableRow = styled(TableRow)`
  height: 46px;

  & > * {
    border-bottom: unset;
  }
`;

const HoldingTableCell = styled(TableCell)`
  padding: 16px 0 0 0;
`;

const Amount = styled(Typography)`
  display: inline;
`;

const Currency = styled(Typography)`
  padding-left: 2px;
  display: inline;
  color: #8b8b8b;
  font-size: 10px;
`;

const HoldingLotRow = styled(TableRow)``;
