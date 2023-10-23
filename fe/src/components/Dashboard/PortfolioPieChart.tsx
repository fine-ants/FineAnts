import usePortfolioChartQuery from "@api/portfolio/queries/usePortfolioChartQuery";
import Legend from "@components/common/PieChart/Legend";
import RechartPieChart from "@components/common/PieChart/RechartPieChart";
import { CSSProperties } from "react";

type Props = {
  width: number;
  height: number;
  legendStyle?: CSSProperties;
};

export default function PortfolioPieChart({
  width,
  height,
  legendStyle,
}: Props) {
  const { data: pieData } = usePortfolioChartQuery();

  return pieData ? (
    <>
      <RechartPieChart width={width} height={height} pieData={pieData} />
      <Legend style={legendStyle} pieData={pieData} />
    </>
  ) : (
    <div>로딩중</div>
    // TODO: loading indicator
  );
}

// ?: 레전드의 위치를 유연하게 관리하면서 같은 pieData를 공유한다면 컴파운드가 딱인 것 같은데 어떻게 생각하시는지
