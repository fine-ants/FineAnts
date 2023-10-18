import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "..";
import { userKeys } from "./queryKeys";

export default function useUserInfoQuery() {
  return useQuery({
    queryKey: userKeys.info().queryKey,
    queryFn: getUserInfo,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "로그인을 먼저 해주세요",
    },
  });
}
