import { useEffect, useRef } from "react";
import { ISeriesApi, LineWidth, PriceLineSource } from "lightweight-charts";
import { Chart, AreaSeries } from "lightweight-charts-react-wrapper";
import styled from "styled-components";

type DataType = {
  time: string;
  value: number;
}[];
type TotalValueLineChartProps = {
  data: DataType;
  currentRangeIndex: number;
};

export default function TotalValueLineChart(props: TotalValueLineChartProps) {
  const seriesRef = useRef<ISeriesApi<"Area">>(null);
  const chartRef = useRef<any>(null);

  const barSpacings = [6, 7, 9, 16, 33, 62];
  // TODO: 숫자들은 상수로 빼기 ex) "1DSpace", "1WSpace", "1MSpace", or "1D", "1W", "1M"

  const options = {
    width: 500,
    height: 300,

    layout: {
      textColor: "black",
      backgroundColor: "#000000",
    },
    rightPriceScale: {
      scaleMargins: {
        top: 0.3,
        bottom: 0.25,
      },
    },
    crosshair: {
      vertLine: {
        width: 1 as LineWidth,
        color: "black",
        style: 3,
      },
      horzLine: {
        visible: true,
        labelVisible: true,
      },
    },
    grid: {
      vertLines: {
        color: "transparent",
      },
      horzLines: {
        color: "transparent",
      },
    },
    timeScale: {
      barSpacing: barSpacings[props.currentRangeIndex],
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [props.currentRangeIndex]);

  return (
    <>
      <StyledLineChart>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          총 자산 현황 추이
        </h1>
        <div style={{ position: "relative" }}>
          <Chart {...options} ref={chartRef}>
            <AreaSeries
              data={props.data}
              topColor="#2962FF"
              bottomColor="rgba(41, 98, 255, 0.28)"
              lineColor="#2962FF"
              lineWidth={2}
              crosshairMarkerVisible={true}
              crosshairMarkerRadius={4}
              ref={seriesRef}></AreaSeries>
          </Chart>
        </div>
      </StyledLineChart>
    </>
  );
}

const StyledLineChart = styled.div`
  width: 688px;
  height: 384px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
