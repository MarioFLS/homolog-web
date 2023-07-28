import { ThemeProvider } from '@mui/material';
import { useContext, useState } from 'react';
import HeaderTable from '../components/Adm/HeaderTable';

import TableAds from '../components/Adm/TableAds';
import HeaderAdm from '../components/Headers/HeaderAdm';
import styles from '../styles/Adm/Adm.module.css';
import themeMain from '../theme/themeMaterialUI';
import AppContext from '../Context/AppContext';

import LoginMain from '../components/Login/LoginMain';

function Adm() {
  const { globalInfoUser } = useContext(AppContext);
  const [typeAds, setTypeAds] = useState(1);
  if (globalInfoUser?.role === import.meta.env.VITE_APP_ROLE_ADM) {
    return (
      <>
        <HeaderAdm />
        <div className={styles.containerMainAdm}>
          <main className={styles.mainAdm}>
            <HeaderTable typeAds={typeAds} setTypeAds={setTypeAds} />
            <ThemeProvider theme={themeMain}>
              <TableAds typeAds={typeAds} setTypeAds={setTypeAds} />
            </ThemeProvider>
          </main>
        </div>
      </>
    );
  }
  return (
    <LoginMain />
  );
}

export default Adm;
