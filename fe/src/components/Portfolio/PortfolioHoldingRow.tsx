import { PortfolioHolding } from "@api/portfolio";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

  const [isOpen, setIsOpen] = useState(false);

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
      </HoldingTableRow>
      <TableRow sx={{ border: "none" }}>
        <TableCell
          style={{ padding: "0 0 0 68.5px", border: "none" }}
          colSpan={9}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>매입 날짜</TableCell>
                    <TableCell>매입가</TableCell>
                    <TableCell align="right">매입 개수</TableCell>
                    <TableCell align="right">메모</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchaseHistory.map(
                    ({
                      id,
                      purchaseDate,
                      numShares,
                      purchasePricePerShare,
                      memo,
                    }) => (
                      <TableRow key={id}>
                        <TableCell component="th" scope="row">
                          {purchaseDate}
                        </TableCell>
                        <TableCell>{purchasePricePerShare}</TableCell>
                        <TableCell align="right">{numShares}</TableCell>
                        <TableCell align="right">{memo}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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
