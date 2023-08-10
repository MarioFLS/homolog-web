/* eslint-disable no-lone-blocks */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import PageInternalError from './pages/PageInternalError';
import LandingPage from './pages/LandingPage';
import './i18n';
import AppProvider from './Context/AppProvider';
import Dashboard from './pages/Dashboard';
import Advertising from './pages/Advertising';
import NewAds from './components/Advertising/NewAds';
import PaymentAds from './components/Advertising/PaymentAds';
import PublishedAds from './components/Advertising/PublishedAds';

import GoalsAds from './components/Advertising/GoalsAds';
import Wallet from './pages/Wallet';

import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';

// import Home from './pages/Home';
import NFTCollection from './pages/NFTCollection';
import Ads from './pages/Ads';
import Adm from './pages/Adm';
import AdvertiserAccess from './pages/AdvertiserAccess';
import AuthUser from './pages/AuthUser';
import PasswordRecovery from './pages/PasswordRecovery';
import TokenPage from './pages/TokenPage';
import SectionLinkAds from './components/Advertising/SectionLinkAds';
// import TesteWallet from './pages/TestWallet';
import RewardLearnAndEarn from './pages/RewardLearnAndEarn/RewardLearnAndEarn';
import LoginRewardLearnAndEarn from './pages/RewardLearnAndEarn/LoginRewardLearnAndEarn';
import SignUpRewardLearnAndEarn from './pages/RewardLearnAndEarn/SignUpRewardLearnAndEarn';

import PageNFTSigned from './pages/PageNFTSigned';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<LandingPage />}
        errorElement={<PageInternalError />}
      >
        <Route path="collection" element={<AuthUser><NFTCollection /></AuthUser>} />
        <Route path="dashboard" element={<AuthUser><Dashboard /></AuthUser>} />
        <Route path="wallet" element={<AuthUser><Wallet /></AuthUser>} />
        <Route path="advertising" element={<AuthUser><Advertising /></AuthUser>}>
          <Route path="new" element={<AuthUser><NewAds /></AuthUser>}>
            <Route path="choices_ad" element={<AuthUser><SectionLinkAds /></AuthUser>} />
            <Route path="goals" element={<AuthUser><GoalsAds /></AuthUser>} />
            <Route path="payment" element={<AuthUser><PaymentAds /></AuthUser>} />
          </Route>
        </Route>
        <Route path="advertising/:id" element={<AuthUser><Ads /></AuthUser>} />
        <Route path="published/:type" element={<AuthUser><PublishedAds /></AuthUser>} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      {/*  <Route path="login" element={<Login />}>
        <Route path="code" element={<SignUp />} />
        <Route path="password-recovery" element={<PasswordRecovery />} />
      </Route> */}
      <Route path="advertiser" element={<AdvertiserAccess />}>
        <Route path="code" element={<SignUp />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="password-recovery" element={<PasswordRecovery />} />
      </Route>
      <Route path="prt-governance-experience" element={<TokenPage />} errorElement={<PageInternalError />} />
      <Route path="nft-signed" element={<PageNFTSigned />} errorElement={<PageInternalError />} />
      <Route path="mb" element={<Navigate to="/" replace />} />
      <Route path="adm" element={<Adm />} errorElement={<PageInternalError />} />
      <Route path="aprenda-e-ganhe" element={<RewardLearnAndEarn />} errorElement={<PageInternalError />}>
        <Route path="login" element={<LoginRewardLearnAndEarn />} />
        <Route path="sign-up" element={<SignUpRewardLearnAndEarn />} />
      </Route>
      {/* <Route path="test" element={<TesteWallet />} errorElement={<PageInternalError />} /> */}
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AppProvider>,
);
