import { PortfolioHolding } from "@api/portfolio";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";
import PortfolioHoldingRow from "./PortfolioHoldingRow";

type Props = {
  portfolioId: number;
  data: PortfolioHolding[];
};

export default function PortfolioHoldingsTable({ portfolioId, data }: Props) {
  return (
    <Table aria-label="collapsible table">
      <TableHead sx={{ border: "none", borderRadius: "8px" }}>
        <ColumnHeader>
          <TableCell />
          <ColumnHeaderField>종목명</ColumnHeaderField>
          <ColumnHeaderField align="right">평가금액</ColumnHeaderField>
          <ColumnHeaderField align="right">현재가</ColumnHeaderField>
          <ColumnHeaderField align="right">평균 매입가</ColumnHeaderField>
          <ColumnHeaderField align="right">개수</ColumnHeaderField>
          <ColumnHeaderField align="right">변동률</ColumnHeaderField>
          <ColumnHeaderField align="right">총 손익</ColumnHeaderField>
          <ColumnHeaderField align="right">연 배당금</ColumnHeaderField>
        </ColumnHeader>
      </TableHead>

      <TableBody>
        {data.map((portfolioHolding) => (
          <PortfolioHoldingRow
            key={portfolioHolding.tickerSymbol}
            portfolioId={portfolioId}
            row={portfolioHolding}
          />
        ))}
      </TableBody>
    </Table>
  );
}

const ColumnHeader = styled(TableRow)`
  background-color: #f6f6f8;
`;

const ColumnHeaderField = styled(TableCell)`
  padding: 5px 0;
`;
