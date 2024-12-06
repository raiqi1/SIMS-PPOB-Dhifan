import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  editProfile,
  getProfile,
  updateImageProfile,
} from "../store/reducers/authReducers";
import {
  MdOutlineAlternateEmail,
  MdOutlineModeEdit,
  MdOutlinePerson,
} from "react-icons/md";
import Header from "../components/Header/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Account() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loader } = useSelector((state: RootState) => state.auth);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
  }, [profile]);

  console.log("profile", profile);

  const changeImage = async (image: File | null) => {
    if (!image) return;
    try {
      const formData = new FormData();
      formData.append("file", image);
      await dispatch(updateImageProfile(formData));
      dispatch(getProfile());
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
    };
    try {
      const response = await dispatch(editProfile(payload)).unwrap();
      console.log("response", response);
      setEdit(false);
      dispatch(getProfile());
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  console.log("edit", edit);
  console.log("firstName", firstName);
  console.log("lastName", lastName);

  return (
    <>
      <Header />
      <div className="px-36 mb-20">
        <div className="flex justify-center">
          <div>
            {loader ? (
              <div>
                <Skeleton width={150} height={150} circle={true} />
              </div>
            ) : (
              <img
                src={profile?.profile_image}
                alt=""
                className="w-24 h-24 rounded-full mt-28 border border-gray-300 p-[1px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null; 
                  (e.target as HTMLImageElement).src = "/assets/Profile.png"; 
                }}
              />
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) =>
                changeImage(e.target.files ? e.target.files[0] : null)
              }
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative bottom-[20px] left-[75px]"
            >
              <div className="border border-gray-300 w-[26px] h-[26px] rounded-full">
                <MdOutlineModeEdit className=" mt-1 ml-1" />
              </div>
            </button>
            <h1 className="flex justify-center font-semibold text-2xl relative bottom-3">
              {loader ? (
                <Skeleton width={200} height={24} />
              ) : (
                profile?.first_name
              )}
            </h1>
          </div>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSaveProfile}>
            <div className="relative">
              <label htmlFor="" className="">
                Email
              </label>
              {loader ? (
                <div className="w-full h-10 bg-gray-200 rounded mt-2 animate-pulse"></div>
              ) : (
                <input
                  type="text"
                  id="phone"
                  className="w-full px-4 py-2 pl-10 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
                  placeholder="masukkan email anda"
                  value={profile?.email}
                  disabled
                />
              )}
              <div
                className={`"text-black" absolute left-3 top-[55px] transform -translate-y-1/2 `}
              >
                <MdOutlineAlternateEmail className="h-4 w-4" size={5} />
              </div>
            </div>
            <div className="relative mt-8">
              <label htmlFor="" className="">
                Nama Depan
              </label>
              {loader ? (
                <div className="w-full h-10 bg-gray-200 rounded mt-2 animate-pulse"></div>
              ) : (
                <input
                  type="text"
                  id="phone"
                  className="w-full px-4 py-2 pl-10 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
                  value={firstName}
                  disabled={!edit}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              )}
              <div
                className={`"text-black" absolute left-3 top-[55px] transform -translate-y-1/2 `}
              >
                <MdOutlinePerson className="h-4 w-4" />
              </div>
            </div>
            <div className="relative mt-8">
              <label htmlFor="" className="">
                Nama Belakang
              </label>
              {loader ? (
                <div className="w-full h-10 bg-gray-200 rounded mt-2 animate-pulse"></div>
              ) : (
                <input
                  type="text"
                  id="phone"
                  className="w-full px-4 py-2 pl-10 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
                  value={lastName}
                  disabled={!edit}
                  onChange={(e) => setLastName(e.target.value)}
                />
              )}
              <div
                className={`"text-black" absolute left-3 top-[55px] transform -translate-y-1/2 `}
              >
                <MdOutlinePerson className="h-4 w-4" />
              </div>
            </div>
            {edit && (
              <>
                <button
                  className="w-full bg-[#FF2929] p-2 rounded text-white mt-4"
                  onClick={() => setEdit(true)}
                >
                  {loader ? "Loading..." : "Simpan"}
                </button>
              </>
            )}
          </form>
          {edit && (
            <button
              className="w-full border border-[#FF2929] p-2 rounded text-[#FF2929] mt-4"
              onClick={handleCancel}
            >
              Batalkan
            </button>
          )}
          {!edit && (
            <>
              <button
                className="w-full bg-[#FF2929] p-2 rounded text-white mt-4"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
              <button
                className="w-full border border-[#FF2929] p-2 rounded text-[#FF2929] mt-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
