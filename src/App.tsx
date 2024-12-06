/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Registration";
import TopUp from "./pages/TopUp";
import Pembelian from "./pages/Pembelian";
import Header from "./components/Header/Header";
import ProfileSaldo from "./components/ProfileSaldo/ProfileSaldo";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { getBalance, getProfile } from "./store/reducers/authReducers";
import Transaction from "./pages/Transaction";
import Account from "./pages/Account";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: any) => state.auth.profile);
  const balance = useSelector((state: any) => state.auth.balance);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, [dispatch]);

  return (
    <Router>
      <MainLayout profile={profile} balance={balance} />
    </Router>
  );
}

function MainLayout({ profile, balance }: { profile: any; balance: any }) {
  const location = useLocation();
  const excludeHeaderAndProfileSaldo = ["/login", "/register", "/account"];

  return (
    <>
      {!excludeHeaderAndProfileSaldo.includes(location.pathname) && (
        <>
          <Header />
          <ProfileSaldo profile={profile} balance={balance} />
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/top-up" element={<TopUp />} />
        <Route path="/pembelian/:code" element={<Pembelian />} />
        <Route path="/transaksi" element={<Transaction />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;