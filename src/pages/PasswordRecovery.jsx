import { useState } from "react";
import styles from '../styles/AccountManagement/SignUp/SignUp.module.css';
import PasswordRecoverySendEmail from "../components/PasswordRecovery/PasswordRecoverySendEmail";
import SendPasswordRecovery from "../components/PasswordRecovery/SendPasswordRecovery";



function PasswordRecovery() {
  const [stage, setStage] = useState(1);
  const [inputEmail, setInputEmail] = useState("");

  return (
    <>
      {' '}
      <main className={styles.main}>
        {stage === 1 && (
        <PasswordRecoverySendEmail setStage={setStage} inputEmail={inputEmail} setInputEmail={setInputEmail} />
        )}
        {stage === 2 && <SendPasswordRecovery inputEmail={inputEmail} /> }
      </main>
    </>
  );
}

export default PasswordRecovery;
