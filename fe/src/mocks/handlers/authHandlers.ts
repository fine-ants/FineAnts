import { HTTPSTATUS } from "@api/types";
import {
  successfulEmailDuplicationCheckData,
  successfulEmailVerificationData,
  successfulNicknameDuplicationCheckData,
  successfulSignUpData,
  unsuccessfulEmailDuplicationCheckData,
  unsuccessfulEmailVerificationData,
  unsuccessfulNicknameDuplicationCheckData,
  unsuccessfulSignUpData,
} from "mocks/data/authData";
import { rest } from "msw";

export default [
  rest.post("/api/auth/signup", async (_, res, ctx) => {
    return res(ctx.status(HTTPSTATUS.created), ctx.json(successfulSignUpData));
    return res(
      ctx.status(HTTPSTATUS.badRequest),
      ctx.json(unsuccessfulSignUpData)
    );
  }),

  rest.post(
    "/api/auth/signup/duplicationcheck/nickname",
    async (_, res, ctx) => {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulNicknameDuplicationCheckData)
      );
      return res(
        ctx.status(HTTPSTATUS.badRequest),
        ctx.json(unsuccessfulNicknameDuplicationCheckData)
      );
    }
  ),

  rest.post("/api/auth/signup/duplicationcheck/email", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulEmailDuplicationCheckData)
    );
    return res(
      ctx.status(HTTPSTATUS.badRequest),
      ctx.json(unsuccessfulEmailDuplicationCheckData)
    );
  }),

  rest.post("/api/auth/signup/verifyEmail", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulEmailVerificationData)
    );
    return res(
      ctx.status(HTTPSTATUS.badRequest),
      ctx.json(unsuccessfulEmailVerificationData)
    );
  }),
];
