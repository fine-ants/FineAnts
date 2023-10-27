import { PurchaseHistoryField } from "@api/portfolio";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PortfolioHoldingLotRow from "./PortfolioHoldingLotRow";

type Props = {
  purchaseHistory: PurchaseHistoryField[];
};

export default function PortfolioHoldingLots({ purchaseHistory }: Props) {
  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>매입 날짜</TableCell>
            <TableCell align="right">매입가</TableCell>
            <TableCell align="right">매입 개수</TableCell>
            <TableCell align="right">메모</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {purchaseHistory.map((lot) => (
            <PortfolioHoldingLotRow key={lot.id} {...lot} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
