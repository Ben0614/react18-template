import { useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "@/store/index";
import { toast } from "react-toastify";

function AuthLayout() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  const mounted = useRef(false);

  // 路由首衛 未登入就到首頁
  useEffect(() => {
    if (isLoggedIn && !mounted.current) {
      mounted.current = true;

      toast.info("請先登出！");
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* 二級路由出口 */}
      <Outlet />
    </>
  );
}

export default AuthLayout;
