import { useLocation } from 'react-router';
import HeaderAccountManagement from '../components/Headers/HeaderAccountManagement';
import FooterHome from '../components/Home/FooterHome';
import LoginMain from '../components/Login/LoginMain';
import SendCode from '../components/SignUp/SendCode';
import PasswordRecovery from './PasswordRecovery';

function Login() {
  const { pathname } = useLocation();
  const style = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "space-between",
    alignItems: "center",
  };
  if (pathname === "/login") {
    return (
      <div style={style}>
        <HeaderAccountManagement />
        <LoginMain />
        <FooterHome />
      </div>
    );
  }
  if (pathname === "/login/code") {
    return (
      <div style={style}>
        <HeaderAccountManagement />
        <SendCode />
        <FooterHome />
      </div>
    );
  }
  return (
    <div style={style}>
      <HeaderAccountManagement />
      <PasswordRecovery />
      <FooterHome />
    </div>
  );
}

export default Login;
