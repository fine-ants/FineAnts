import { PurchaseHistoryField } from "@api/portfolio";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import PortfolioHoldingLotRow from "./PortfolioHoldingLotRow";

type Props = {
  purchaseHistory: PurchaseHistoryField[];
};

export default function PortfolioHoldingLots({ purchaseHistory }: Props) {
  const onAddPurchaseClick = () => {
    // TODO: Open modal
  };

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
        <TableFooter>
          <TableCell align="right" colSpan={5} sx={{ border: "none" }}>
            <Button variant="text" onClick={onAddPurchaseClick}>
              매입 이력 추가
            </Button>
          </TableCell>
        </TableFooter>
      </Table>
    </>
  );
}
