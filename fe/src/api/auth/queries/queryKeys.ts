import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getUserInfo } from "..";

export const userKeys = createQueryKeys("user", {
  signIn: () => ({
    queryKey: ["signIn"],
  }),
  signUp: () => ({
    queryKey: ["signUp"],
  }),
  info: () => ({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  }),
  edit: () => ({
    queryKey: ["edit"],
  }),
});
