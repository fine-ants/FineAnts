import { useCallback, useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Sector } from "recharts";
import { addComma } from "@utils/addComma";
import LegendItem from "./LegendItem";

const data = [
  { name: "내꿈은워렌버핏", value: 2500000, fill: "#0088FE" },
  { name: "단타왕", value: 3235500, fill: "#00C49F" },
  { name: "물린게아니고장기투자", value: 1573500, fill: "#FFBB28" },
];

const total = 6000030;

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    activeIndex,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  console.log("함수안에서", activeIndex);

  return (
    <g>
      <text
        style={{ fontSize: "18px", fontWeight: "bold" }}
        x={cx}
        y={cy - 3}
        textAnchor="middle"
        fill={"black"}>
        {payload.name}
      </text>
      <text
        style={{ fontSize: "15px", fontWeight: "bold" }}
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fill={"black"}>
        {addComma(payload.value)}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + 5}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      /> */}
      {/* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      /> */}
      {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 2}
        y={ey}
        textAnchor={textAnchor}
        fill="#333">{`${(percent * 100).toFixed(2)}%`}</text> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text> */}
    </g>
  );
};

export default function PortfolioPieChart() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const onPieLeave = useCallback(() => {
    setActiveIndex(-1);
  }, [setActiveIndex]);

  console.log(activeIndex);

  return (
    <StyledPortfolioPieChart>
      {activeIndex < 0 ? (
        <TotalValue>
          <p>총 자산 현황</p>
          <div>{addComma(total)}</div>
        </TotalValue>
      ) : null}
      <PieChartWrapper>
        <PieChart width={384} height={384}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={200}
            cy={168}
            innerRadius={80}
            outerRadius={132}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          />
        </PieChart>
      </PieChartWrapper>
      <Legend>
        {data.map((item) => (
          <LegendItem key={item.name} color={item.fill} title={item.name} />
        ))}
      </Legend>
    </StyledPortfolioPieChart>
  );
}

const StyledPortfolioPieChart = styled.div`
  width: 460px;
  height: 384px;
  background-color: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #000000;
`;

const TotalValue = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 40%;
  left: 43%;
  z-index: 3;
  > p {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
  }

  > div {
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
    color: #000000;
  }
`;

const PieChartWrapper = styled.div`
  position: absolute;
  z-index: 2;
`;

const Legend = styled.div`
  display: flex;
  width: 300px;
  height: 35px;
  // border: 1px solid black;
  position: absolute;
  bottom: 15px;
  justify-content: center;
  gap: 15px;
`;
