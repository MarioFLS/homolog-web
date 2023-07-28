import { Outlet, useLocation } from "react-router";
import HeaderAccountManagement from "../components/Headers/HeaderAccountManagement";
import LoginMain from "../components/Login/LoginMain";
import FooterHome from "../components/Home/FooterHome";

function AdvertiserAccess() {
  const { pathname } = useLocation();
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "space-between",
    }}
    >
      <HeaderAccountManagement />
      <div>
        {pathname === "/advertiser" ? <LoginMain /> : <Outlet />}
      </div>
      <FooterHome />
    </div>
  );
}

export default AdvertiserAccess;
