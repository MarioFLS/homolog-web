import { Outlet, useLocation } from "react-router";
import HeaderAccountManagement from "../../components/Headers/HeaderAccountManagement";
import RewardLearnAndEarnFooter from "../../components/RewardLearnAndEarn/RewardLearnAndEarnFooter";
import RewardLearnAndEarnMain from "../../components/RewardLearnAndEarn/RewardLearnAndEarnMain";
import styles from "../../styles/RewardLearnAndEarn/RewardLearnAndEarn/RewardLearnAndEarnMain.module.css";

function RewardLearnAndEarn() {
  const { pathname } = useLocation();
  const url = pathname?.split('/');

  return (
    <div className={styles.containerLearnAndEarn}>
      <HeaderAccountManagement />
      {url.includes("login") || url.includes("sign-up") || url.includes("reward") ? <Outlet /> : <RewardLearnAndEarnMain />}
      <RewardLearnAndEarnFooter />
    </div>
  );
}

export default RewardLearnAndEarn;
