import axios from "axios";
import { getToken, setToken } from "@/utils/auth";
import { toast } from "react-toastify";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_REQUEST_BASE_URL, // api 的 base_url
  timeout: import.meta.env.VITE_APP_REQUEST_TIMEOUT,
  withCredentials: true,
});

// request攔截器
service.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    if (getToken()) {
      config.headers.AUTH_TOKEN = getToken() ?? "";
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response攔截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          try {
            toast.info("登入逾時，請重新登入");
          } catch (err) {
            console.log(err);
          }
          break;
        case 403:
          try {
            toast.info("權限不足");
          } catch (err) {
            console.log(err);
          }
          break;
        case 404:
          console.log("找不到該頁面");
          break;
        case 500:
          console.log("伺服器出錯");
          break;
        case 503:
          console.log("服務失效");
          break;
      }

      // 登出
    } else {
      console.error(error);
    }
    return Promise.reject(error.response);
  }
);

type IResponseType = "json" | "blob" | "text" | "arraybuffer" | "document";
export function fetch<T>(url: string, params = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post<T>(
  url: string,
  data = {},
  headers = {},
  timeout = import.meta.env.VITE_APP_REQUEST_TIMEOUT
): Promise<T> {
  return new Promise((resolve, reject) => {
    service
      .post(url, data, {
        headers: headers,
        timeout: timeout,
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
}

export function remove<T>(url: string, data = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service.delete(url, { data }).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export function put<T>(
  url: string,
  data = {},
  headers = {},
  timeout = import.meta.env.VITE_APP_REQUEST_TIMEOUT
): Promise<T> {
  return new Promise((resolve, reject) => {
    service
      .put(url, data, {
        headers: headers,
        timeout: timeout,
      })
      .then(
        (response) => {
          resolve(
            response.data["result"] ? response.data["result"] : response.data
          );
        },
        (err) => {
          reject(err);
        }
      );
  });
}

export function patch<T>(url: string, data = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
