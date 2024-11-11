export interface ILoginReq {
  account: string;
  password: string;
  code: string;
}

export interface ILoginRespData {
  id: number;
  name: string;
  tokenId: string;
}

export interface ILoginResp {
  data: ILoginRespData;
}

export interface ILogoutResp {
  data: null;
}
