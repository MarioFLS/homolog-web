import { useEffect, useState } from 'react';

import { useLocation } from 'react-router';
import FormsUser from '../components/SignUp/FormsUser';
import styles from '../styles/AccountManagement/SignUp/SignUp.module.css';
import SendCode from '../components/SignUp/SendCode';

function SignUp() {
  const [stage, setStage] = useState(1);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/advertiser/code") {
      setStage(2);
    }
  }, []);
  return (
    <>
      {' '}
      <main className={styles.main}>
        {stage === 1 && (
        <FormsUser setStage={setStage} />
        )}
        {stage === 2 && <SendCode /> }
      </main>
    </>

  );
}

export default SignUp;
