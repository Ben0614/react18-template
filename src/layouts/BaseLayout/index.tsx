import { Outlet, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import classnames from "classnames";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "@/store/index";
import { logout } from "@/store/modules/userReducer";
import { useNavigation } from "@/hooks/useNavigation";

function BaseLayout() {
  const dispatch = useDispatch();
  const { goToPage } = useNavigation();

  const { isLoggedIn, id, name } = useSelector((state) => state.user);

  const logoutSubmit = () => {
    dispatch(logout());
    goToPage("/auth/signIn");
  };
  return (
    <>
      {/* 導航欄 */}
      <nav className="bg-white shadow-sm border-b-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo 和網站名稱 */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800">我的網站</span>
            </div>

            {/* 導航連結 */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn && (
                <>
                  <button
                    className={classnames(
                      "flex items-center space-x-1 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    )}
                    onClick={() => goToPage("/auth/signIn")}
                  >
                    <LogIn className="h-5 w-5" />
                    <span>登入</span>
                  </button>
                  <button
                    className={classnames(
                      "flex items-center space-x-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                    )}
                    onClick={() => goToPage("/auth/signUp")}
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>註冊</span>
                  </button>
                </>
              )}
              {isLoggedIn && (
                <>
                  <button
                    className={classnames(
                      "flex items-center space-x-1 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    )}
                    onClick={logoutSubmit}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>登出</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* 二級路由出口 */}
      <main className="min-h-[calc(100vh-146px)] bg-gray-50">
        <Outlet />
      </main>
      {/* 頁腳 */}
      <footer className="bg-blue-200 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} 我的網站. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default BaseLayout;
