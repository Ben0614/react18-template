import { fetch, post, put, remove } from "@/services/httpClientService";
import type { ILoginReq, ILogoutResp, ILoginResp } from "@/model/api/user";

const formDataHeaders = {
  "Content-Type": "multipart/form-data",
};
export const user = {
  // 登入
  login: (paramObj: ILoginReq): Promise<ILoginResp> => post("/login", paramObj),

  // 登出
  logout: (): Promise<ILogoutResp> => post("/logout"),
};
