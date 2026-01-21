import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Event from "../pages/Event/Event";
import Deposit from "../pages/Deposit/Deposit";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Account from "../pages/Account/Account";
import Withdraw from "../pages/Withdraw/Withdraw";
import InPlay from "../pages/InPlay/InPlay";
import StakeSetting from "../pages/StakeSetting/StakeSetting";
import BettingProfitLoss from "../pages/BettingProfitLoss/BettingProfitLoss";
import SingleProfitLoss from "../pages/SingleBettingProfitLoss/SingleBettingProfitLoss";
import DepositWithdrawReport from "../pages/DepositWithdrawReport/DepositWithdrawReport";
import LiveCasino from "../pages/LiveCasino/LiveCasino";
import IFrame from "../pages/IFrame/IFrame";
import Cricket from "../pages/Cricket/Cricket";
import Football from "../pages/Football/Football";
import Tennis from "../pages/Tennis/Tennis";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Promotions from "../pages/Promotions/Promotions";
import LossBackClaims from "../pages/LossBackClaims/LossBackClaims";
import APK from "../pages/APK/APK";
import NotFound from "../pages/NotFound/NotFound";
import Affiliate from "../pages/Affiliate/Affiliate";
import AffiliateUserProfitLoss from "../pages/AffiliateUserProfitLoss/AffiliateUserProfitLoss";
import AffiliateUserStatement from "../pages/AffiliateUserStatement/AffiliateUserStatement";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import MultiMarkets from "../pages/MultiMarkets/MultiMarkets";

const MainRouter = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/cricket",
            element: <Cricket />,
          },
          {
            path: "/football",
            element: <Football />,
          },
          {
            path: "/tennis",
            element: <Tennis />,
          },
          {
            path: "/live-casino",
            element: <LiveCasino />,
          },
          {
            path: "/:route/:name/:gameId",
            element: <IFrame />,
          },
          {
            path: "/:eventTypeId/:eventId",
            element: <Event />,
          },
          {
            path: "/in-play",
            element: <InPlay />,
          },
          {
            path: "/stake-setting",
            element: <StakeSetting />,
          },

          {
            path: "/account",
            element: <Account />,
          },
          {
            path: "/deposit",
            element: <Deposit />,
          },
          {
            path: "/withdraw",
            element: <Withdraw />,
          },
          {
            path: "/betting-profit-loss",
            element: <BettingProfitLoss />,
          },
          {
            path: "/betting-profit-loss/:marketId",
            element: <SingleProfitLoss />,
          },
          {
            path: "/deposit-withdraw-report",
            element: <DepositWithdrawReport />,
          },
          {
            path: "/promotions",
            element: <Promotions />,
          },
          {
            path: "/lossback-claims",
            element: <LossBackClaims />,
          },
          {
            path: "/apk",
            element: <APK />,
          },
          {
            path: "/affiliate",
            element: <Affiliate />,
          },
          {
            path: "/affiliate/user-profit-loss",
            element: <AffiliateUserProfitLoss />,
          },
          {
            path: "/affiliate/user-statement",
            element: <AffiliateUserStatement />,
          },
          {
            path: "/terms-conditions",
            element: <TermsConditions />,
          },
          {
            path: "/multi-markets",
            element: <MultiMarkets />,
          },
          {
            path: "/change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
    {
      basename: import.meta.env.BASE_URL ?? "/",
    },
  );

  return <RouterProvider router={router} />;
};

export default MainRouter;
