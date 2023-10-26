import { TableCell, TableRow } from "@mui/material";
import { formatDate } from "@utils/date";

type Props = {
  purchaseDate: string;
  purchasePricePerShare: number;
  numShares: number;
  memo: string;
};

export default function PortfolioHoldingLotRow({
  purchaseDate,
  purchasePricePerShare,
  numShares,
  memo,
}: Props) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {formatDate(purchaseDate)}
      </TableCell>
      <TableCell>{purchasePricePerShare}</TableCell>
      <TableCell align="right">{numShares}</TableCell>
      <TableCell align="right">{memo}</TableCell>
    </TableRow>
  );
}
