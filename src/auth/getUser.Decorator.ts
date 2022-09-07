import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./entities/user.entity";

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const Req = ctx.switchToHttp().getRequest();
    return Req.user
  }
);