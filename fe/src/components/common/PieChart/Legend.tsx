import styled from "styled-components";
import LegendItem from "./LegendItem";
import { PieChartType } from "@api/portfolio";
import { CSSProperties } from "react";

type Props = {
  style?: CSSProperties;
  pieData: PieChartType[];
};
export default function Legend({ style, pieData }: Props) {
  return (
    <StyledLegend style={style}>
      {pieData ? (
        pieData.map((item) => (
          <LegendItem key={item.name} color={item.fill} title={item.name} />
        ))
      ) : (
        <div>로딩중</div>
        // TODO: 로딩인디케이터
      )}
    </StyledLegend>
  );
}

const StyledLegend = styled.div`
  display: flex;
  width: 300px;
  height: 35px;
  // border: 1px solid black;
  position: absolute;
  // bottom: 15px;
  justify-content: center;
  gap: 15px;
`;
