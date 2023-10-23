import { HTTPSTATUS } from "@api/types";

export const successfulPortfolioData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "카테고리 목록 조회를 성공하였습니다",
  data: [
    { name: "내꿈은워렌버핏", value: 2500000, fill: "#0088FE" },
    { name: "단타왕", value: 3235500, fill: "#00C49F" },
    { name: "물린게아니고장기투자", value: 1573500, fill: "#FFBB28" },
  ],
};

//TODO: api portfolios로 가져오는 데이터의 값이랑 다른 상태라 상의후에 통일해야함 포스트맨 api에는 value와 fill이 없음
