import { PortfolioHolding } from "@api/portfolio";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  portfolioId: number;
  data: PortfolioHolding[];
};

export default function PortfolioHoldingsTable({ portfolioId, data }: Props) {
  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>종목명</TableCell>
          <TableCell align="right">평가금액</TableCell>
          <TableCell align="right">현재가</TableCell>
          <TableCell align="right">평균 매입가</TableCell>
          <TableCell align="right">개수</TableCell>
          <TableCell align="right">변동률</TableCell>
          <TableCell align="right">총 손익</TableCell>
          <TableCell align="right">연 배당금</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((portfolioHolding) => (
          <HoldingRow
            key={portfolioHolding.tickerSymbol}
            portfolioId={portfolioId}
            row={portfolioHolding}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function HoldingRow({
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
    tradeHistories,
  } = row;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography sx={{ fontSize: "1rem" }} component="h3">
            <Link
              to={`/portfolio/$${portfolioId}/holding/${portfolioHoldingId}`}>
              {companyName}
            </Link>
          </Typography>
          <span>{tickerSymbol}</span>
        </TableCell>
        <TableCell align="right">
          <span>{currentValuation}</span>
          <span>KRW</span>
        </TableCell>
        <TableCell align="right">{currentPrice}</TableCell>
        <TableCell align="right">{averageCostPerShare}</TableCell>
        <TableCell align="right">{numShares}</TableCell>
        <TableCell align="right">
          <span>{dailyChangeRate}%</span>
          <span>{dailyChange}</span>
        </TableCell>
        <TableCell align="right">
          <span>{totalReturnRate}%</span>
          <span>{totalGain}</span>
        </TableCell>
        <TableCell align="right">
          <span>{annualDividendYield}%</span>
          <span>{annualDividend}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: "0 0 0 68.5px" }} colSpan={9}>
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
                  {tradeHistories.map(
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
