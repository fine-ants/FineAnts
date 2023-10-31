import { HTTPSTATUS } from "@api/types";

export const successfulSignUpData = {
  code: HTTPSTATUS.created,
  status: "Created",
  message: "회원가입이 완료되었습니다",
  data: {
    member: {
      nickname: "Kakamotobi",
      email: "daeram.chung@gmail.com",
    },
  },
};

export const unsuccessfulSignUpData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "회원가입이 실패했습니다",
  data: null,
};

export const successfulNicknameDuplicationCheckData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "닉네임이 사용 가능합니다",
  data: null,
};

export const unsuccessfulNicknameDuplicationCheckData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "닉네임이 중복되었습니다",
  data: null,
};

export const successfulEmailDuplicationCheckData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "이메일이 사용 가능합니다",
  data: null,
};

export const unsuccessfulEmailDuplicationCheckData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "이메일이 중복되었습니다",
  data: null,
};

export const successfulEmailVerificationData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "이메일로 검증코드를 전송하였습니다",
  data: null,
};

export const unsuccessfulEmailVerificationData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "이메일 검증코드 전송을 실패했습니다",
  data: null,
};
