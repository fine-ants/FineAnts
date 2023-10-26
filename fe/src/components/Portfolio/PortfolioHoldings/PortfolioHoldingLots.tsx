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
import { useState } from "react";
import PortfolioHoldingLotRow from "./PortfolioHoldingLotRow";
import PortfolioHoldingLotRowEdit from "./PortfolioHoldingLotRowEdit";

type Props = {
  purchaseHistory: PurchaseHistoryField[];
};

export default function PortfolioHoldingLots({ purchaseHistory }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const onEditLotsButtonClick = () => {
    setIsEditing(true);
  };

  const onLotChangesSave = () => {
    // TODO: Send request to save changes
    setIsEditing(false);
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
          {purchaseHistory.map((lot) => {
            return isEditing ? (
              <PortfolioHoldingLotRowEdit key={lot.id} {...lot} />
            ) : (
              <PortfolioHoldingLotRow key={lot.id} {...lot} />
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" colSpan={4}>
              {isEditing ? (
                <Button variant="text" onClick={onLotChangesSave}>
                  저장
                </Button>
              ) : (
                <Button variant="text" onClick={onEditLotsButtonClick}>
                  수정
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
