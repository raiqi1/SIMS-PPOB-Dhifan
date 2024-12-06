/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  MdLockOutline,
  MdOutlineAlternateEmail,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import type { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/authReducers";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  console.log("error", error);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    try {
      const response = await dispatch(login(payload)).unwrap();
      console.log("response", response);
      navigate("/");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.message);
    }
  };

  return (
    <div className="flex w-full  ">
      <div className="w-full  p-[10vw]">
        <form onSubmit={handleLogin}>
          <div>
            <div className="flex w-full justify-center gap-2">
              <img src="../../../assets/logo.png" alt="" />
              <h1 className="text-black font-semibold text-lg flex flex-col justify-center">
                SIMS PPB
              </h1>
            </div>
            <div className="flex text-center justify-center mt-7 font-semibold text-xl mb-10">
              Masuk atau buat akun
              <br /> untuk memulai
            </div>
          </div>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
              placeholder="masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div
              className={`${
                email ? "text-black" : "text-gray-400"
              } absolute left-3 top-[25px] transform -translate-y-1/2 `}
            >
              <MdOutlineAlternateEmail className="h-4 w-4" size={5} />
            </div>
          </div>
          <div className="relative mt-6">
            <input
              type={showPassword ? "password" : "text "}
              id="phone"
              className="w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
              placeholder="buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={`${
                password ? "text-black" : "text-gray-400"
              } absolute left-3 top-[25px] transform -translate-y-1/2 `}
            >
              <MdLockOutline className="h-4 w-4" size={5} />
            </div>
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </div>
          </div>
          <button className="w-full text-white  text-center bg-[#FF2929] p-3 mt-10 rounded-md">
            <h1 className="">Masuk</h1>
          </button>
        </form>

        <div>
          <div className="flex justify-center mt-5">
            <h1 className="text-black text-sm">
              belum punya akun? registrasi{" "}
              <a href="/register" className="text-[#FF2929]">
                disini
              </a>
            </h1>
          </div>
        </div>
      </div>
      <div className=" flex justify-end w-full">
        <img src="../../../../assets/bglogin.png" alt="" className="" />
      </div>
    </div>
  );
}
