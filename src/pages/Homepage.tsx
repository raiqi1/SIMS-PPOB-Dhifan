import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBalance, getProfile } from "../store/reducers/authReducers";
import type { AppDispatch, RootState } from "../store";
import FeatureList from "../components/Fitur/Fitur";
import BannerSlider from "../components/BannerSlider/Slider";
import { getBanner, getService } from "../store/reducers/informationReducer";
// import ProfileSaldo from "../components/ProfileSaldo/ProfileSaldo";
// import Header from "../components/Header/Header";

export default function Homepage() {
  const dispatch = useDispatch<AppDispatch>();
  const { service, loader, banner } = useSelector(
    (state: RootState) => state.information
  );
  // const { profile, loader: loaderProfile } = useSelector(
  //   (state: RootState) => state.auth
  // );
  // const { balance } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
    dispatch(getService());
    dispatch(getBanner());
  }, [dispatch]);

  return (
    <div>
      {/* <Header />
      <ProfileSaldo
        profile={profile}
        balance={balance}
        loader={loaderProfile}
      /> */}
      <div className="px-24">
        <FeatureList features={service} loader={loader} />
      </div>
      <div className="ps-24">
        <BannerSlider bannerImg={banner} loader={loader} />
      </div>
    </div>
  );
}
