/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getBalance, getProfile} from "../store/reducers/authReducers";
import type { AppDispatch, RootState } from "../store";
// import Header from "../components/Header/Header"; // Import FeatureList component
import FeatureList from "../components/Fitur/Fitur";
import BannerSlider from "../components/BannerSlider/Slider";
// import ProfileSaldo from "../components/ProfileSaldo/ProfileSaldo";
import { getService } from "../store/reducers/informationReducer";

export default function Homepage() {
  const dispatch = useDispatch<AppDispatch>();
  const balance = useSelector((state: RootState) => state.auth.balance);
  const service = useSelector((state: RootState) => state.information.service);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
    dispatch(getService());
  }, [dispatch]);

  console.log("balance", balance);
  console.log("service",service)

  return (
    <div>
      {/* <Header />
      <ProfileSaldo profile={profile} balance={balance} /> */}
      <div className="px-24">
        <FeatureList features={service} />
      </div>
      <div className="ps-24">
        <BannerSlider />
      </div>
    </div>
  );
}
