import { useState } from "react";
import { useNavigation } from "@/hooks/useNavigation";
import { useDispatch } from "react-redux";
import { handleProfile } from "@/store/modules/userReducer";
import { KeyRound, User, ShieldCheck, Eye, EyeClosed } from "lucide-react";
import { user as apiUser } from "@/api/user";
import { ILoginReq } from "@/model/api/user";
import classnames from "classnames";
import { toast } from "react-toastify";
import md5 from "md5";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { rules } from "@/utils/rules";

// 驗證規則 (這邊有幾個參數 <form>裡面就必須都有 否則submit無效)
const loginSchema = yup.object().shape({
  account: yup.string().required("請輸入帳號"),
  password: yup
    .string()
    .matches(rules.password.matches, rules.password.message)
    .required("請輸入密碼"),
  code: yup.string().max(6, "不可大於6位數").required("請輸入驗證碼"),
});

function SignIn() {
  const { goToPage } = useNavigation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      account: "",
      password: "",
      code: "",
    },
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [loginSubmitLoading, setLoginSubmitLoading] = useState(false);
  const loginSubmit = async (data: ILoginReq) => {
    // console.log("data", data);

    setLoginSubmitLoading(true);

    try {
      const params = {
        account: data.account,
        password: md5(data.password),
        code: data.code,
      };

      // const result = await apiUser.login(params);
      // 模擬api result
      const result = {
        data: {
          id: 1,
          name: "admin",
          tokenId: "zxcvbasdfg123456798",
        },
      };

      await dispatch(handleProfile(result.data));
      goToPage("/");
      toast.success("登入成功");
      reset();
    } catch (err: any) {
      toast.error(err.msgs[0]);
      console.log(err);
    } finally {
      setLoginSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">歡迎回來</h1>
            <p className="text-gray-600 mt-2">請輸入您的帳號資訊</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(loginSubmit)}>
            <div className="space-y-4">
              {/* 帳號輸入框 */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="account"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={classnames(
                          "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                          {
                            "border-red-500 focus:ring-2 focus:ring-red-500":
                              errors.account,
                          }
                        )}
                        placeholder="請輸入帳號"
                      />
                    )}
                  />
                </div>
                {errors.account && (
                  <p className="text-red-500 my-2">{errors.account.message}</p>
                )}
              </div>

              {/* 密碼輸入框 */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={isShowPassword ? "text" : "password"}
                        name="password"
                        className={classnames(
                          "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                          {
                            "border-red-500 focus:ring-2 focus:ring-red-500":
                              errors.password,
                          }
                        )}
                        placeholder="請輸入密碼"
                      />
                    )}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <Eye className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeClosed className="h-5 w-5 text-gray-400 " />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 my-2">{errors.password.message}</p>
                )}
              </div>

              {/* 驗證碼輸入框 */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex space-x-2">
                    <Controller
                      name="code"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          name="code"
                          className={classnames(
                            "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            {
                              "border-red-500 focus:ring-2 focus:ring-red-500":
                                errors.code,
                            }
                          )}
                          placeholder="請輸入驗證碼"
                        />
                      )}
                    />
                    {/* 驗證碼圖片區域 */}
                    {/* <div className="flex-shrink-0 w-32 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-sm text-gray-600">驗證碼圖片</span>
                    </div> */}
                  </div>
                </div>
                {errors.code && (
                  <p className="text-red-500 my-2">{errors.code.message}</p>
                )}
              </div>
            </div>

            {/* 記住我和忘記密碼 */}
            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-500 rounded"
                />
                <span className="ml-2 text-gray-600">記住我</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-500">
                忘記密碼？
              </a>
            </div> */}

            {/* 登入按鈕 */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loginSubmitLoading}
            >
              登入
            </button>
          </form>

          {/* 註冊連結 */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">還沒有帳號？</span>
            <span
              className="ml-1 text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => goToPage("/auth/SignUp")}
            >
              立即註冊
            </span>
          </div>
          <div className="mt-6 text-center text-sm">
            <span
              className="ml-1 text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => goToPage("/")}
            >
              回首頁
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
