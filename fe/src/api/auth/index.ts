import { Response } from "api/types";
import { fetcher } from "../fetcher";

export type SignInCredentials = {
  email: string;
  password: string;
};

type SignInData = {
  jwt: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: number;
    nickname: string;
    email: string;
    profileUrl: string;
  };
};

export type SignUpData = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  verificationCode: string;
};

export type User = {
  userId: number;
  nickname: string;
  imageUrl: string;
};

export type OAuthProvider = "google" | "naver" | "kakao";

type AccessTokenData = {
  accessToken: string;
};

export const postSignUp = async (body: SignUpData) => {
  const res = await fetcher.post<Response<null>>("/auth/signup", body);
  return res.data;
};

export const postSignIn = async (body: SignInCredentials) => {
  const res = await fetcher.post<Response<SignInData>>("/auth/login", body);
  return res.data;
};

export const postOAuthSignIn = async (
  provider: OAuthProvider,
  authCode: string
) => {
  const res = await fetcher.get<Response<SignInData>>(
    `/auth/${provider}/login?code=${authCode}`
  );
  return res.data;
};

export const deleteSignOut = async () => {
  const res = await fetcher.delete<Response<null>>("/auth/logout");
  return res.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await fetcher.post<Response<AccessTokenData>>(
    "/auth/refresh/token",
    { refreshToken }
  );
  return res.data;
};

export const getUserInfo = async () => {
  const res = await fetcher.get<Response<User>>("/users/info");
  return res.data;
};

export const patchUserInfo = async (body: FormData) => {
  const res = await fetcher.patch<Response<null>>("/users/info", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const postNicknameDuplicateCheck = async (nickname: string) => {
  const res = await fetcher.post<Response<null>>(
    "/auth/signup/duplicationcheck/nickname",
    { nickname }
  );
  return res.data;
};

export const postEmailDuplicateCheck = async (email: string) => {
  const res = await fetcher.post<Response<null>>(
    "/auth/signup/duplicationcheck/email",
    { email }
  );
  return res.data;
};

export const postEmailVerification = async (email: string) => {
  const res = await fetcher.post<Response<null>>("/auth/signup/verifyEmail", {
    email,
  });
  return res.data;
};
