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
import { formatDate } from "@utils/date";
import { useState } from "react";

type Props = {
  purchaseHistory: PurchaseHistoryField[];
};

export default function PortfolioHoldingLots({ purchaseHistory }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const onEditLotsButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <>
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
            ({ id, purchaseDate, numShares, purchasePricePerShare, memo }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {formatDate(purchaseDate)}
                </TableCell>
                <TableCell>{purchasePricePerShare}</TableCell>
                <TableCell align="right">{numShares}</TableCell>
                <TableCell align="right">{memo}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" colSpan={4}>
              <Button variant="text" onClick={onEditLotsButtonClick}>
                수정
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
