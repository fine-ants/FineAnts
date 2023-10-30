import styled from "styled-components";
import LegendItem from "./LegendItem";

import { CSSProperties } from "react";
import { chartColorPalette } from "styles/chartColorPalette";

type Props = {
  pieData: { name: string; value: number }[];
  style?: CSSProperties;
};
export default function Legend({ pieData, style }: Props) {
  return (
    <StyledLegend style={style}>
      {pieData ? (
        pieData.map((item, index) => (
          <LegendItem
            key={item.name}
            color={chartColorPalette[index]}
            title={item.name}
          />
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
  position: absolute;
  gap: 15px;
`;
