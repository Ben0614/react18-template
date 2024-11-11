import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import classnames from "classnames";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "@/store/index";
import { logout } from "@/store/modules/userReducer";
import { useNavigation } from "@/hooks/useNavigation";

function Home() {
  const notify = () => toast.success("歡迎來到首頁!");
  const dispatch = useDispatch();
  const { goToPage } = useNavigation();

  const { isLoggedIn, id, name } = useSelector((state) => state.user);

  const logoutSubmit = () => {
    dispatch(logout());
    goToPage("/auth/signIn");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          歡迎來到我的網站
        </h1>
        <button
          className={classnames(
            "bg-green-600 hover:bg-green-700 text-white rounded px-5 py-1 my-5"
          )}
          onClick={notify}
        >
          通知
        </button>
        <p className="text-lg text-gray-600 mb-8">
          這是一個簡單的首頁示例，您可以選擇登入或註冊
        </p>
        <div className="flex justify-center space-x-4">
          {!isLoggedIn && (
            <>
              <button
                className={classnames(
                  "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                )}
                onClick={() => goToPage("/auth/signIn")}
              >
                立即登入
              </button>
              <button
                className={classnames(
                  "inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                )}
                onClick={() => goToPage("/auth/signUp")}
              >
                免費註冊
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              className={classnames(
                "inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md  text-white bg-pink-600 hover:bg-pink-700 transition-colors duration-200"
              )}
              onClick={logoutSubmit}
            >
              登出
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
