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
import reportWebVitals from './reportWebVitals';
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
//import NFTCollection from './pages/NFTCollection';
import Ads from './pages/Ads';
import Adm from './pages/Adm';
import AdvertiserAccess from './pages/AdvertiserAccess';
import AuthUser from './pages/AuthUser';
import PasswordRecovery from './pages/PasswordRecovery';
import TokenPage from './pages/TokenPage';
import SectionLinkAds from './components/Advertising/SectionLinkAds';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<LandingPage />}
        errorElement={<PageInternalError />}
      >
        {/* <Route path="collection" element={<AuthUser><NFTCollection /></AuthUser>} /> */}
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
      <Route path="mb" element={<Navigate to="/" replace />} />
      <Route path="adm" element={<Adm />} errorElement={<PageInternalError />} />
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AppProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
