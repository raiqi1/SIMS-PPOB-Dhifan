import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MdLockOutline,
  MdOutlineAlternateEmail,
  MdOutlinePerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import type { AppDispatch, RootState } from "../store";
import { register } from "../store/reducers/authReducers";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const { errorMessage } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const cekPassword = () => {
    if (password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    cekPassword();
    if (error) return;

    const payload = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    };
    setIsLoading(true);

    try {
      await dispatch(register(payload)).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setErrorRegister(true);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("errorMessage", errorMessage);

  return (
    <div className="flex w-full max-sm:flex-col">
      <div className="w-full p-[10vw]">
        <form onSubmit={handleRegister}>
          <div>
            <div className="flex w-full justify-center gap-2">
              <img src="../../../assets/logo.png" alt="" />
              <h1 className="text-black font-semibold text-lg flex flex-col justify-center">
                SIMS PPB
              </h1>
            </div>
            <div className="flex text-center justify-center mt-7 font-semibold text-xl mb-10">
              Lengkapi data untuk <br /> membuat akun
            </div>
          </div>
          {/* Input Email */}
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
              placeholder="masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div
              className={`absolute left-3 top-[19px] ${
                email ? "text-black" : "text-gray-400"
              }`}
            >
              <MdOutlineAlternateEmail className="h-4 w-4" />
            </div>
          </div>
          {/* Input Nama Depan */}
          <div className="relative mt-6">
            <input
              type="text"
              className="w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
              placeholder="nama depan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div
              className={`absolute left-3 top-[19px] ${
                firstName ? "text-black" : "text-gray-400"
              }`}
            >
              <MdOutlinePerson className="h-4 w-4" />
            </div>
          </div>
          {/* Input Nama Belakang */}
          <div className="relative mt-6">
            <input
              type="text"
              className="w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
              placeholder="nama belakang"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div
              className={`absolute left-3 top-[19px] ${
                lastName ? "text-black" : "text-gray-400"
              }`}
            >
              <MdOutlinePerson className="h-4 w-4" />
            </div>
          </div>
          {/* Input Password */}
          <div className="relative mt-6">
            <input
              type={showPassword ? "password" : "text"}
              className="w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-sm"
              placeholder="buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={cekPassword}
            />
            <div
              className={`absolute left-3 top-[19px] ${
                password ? "text-black" : "text-gray-400"
              }`}
            >
              <MdLockOutline className="h-4 w-4" />
            </div>
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[40%] cursor-pointer text-gray-500"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </div>
          </div>
          {/* Konfirmasi Password */}
          <div className="relative mt-6">
            <input
              type={showConfirmPassword ? "password" : "text"}
              className={`w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded focus:outline-none ${
                error ? "focus:ring-red-500" : "focus:ring-gray-300"
              } placeholder:text-sm`}
              placeholder="konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={cekPassword}
            />
            <div
              className={`absolute left-3 top-[19px] ${
                confirmPassword ? "text-black" : "text-gray-400"
              }`}
            >
              <MdLockOutline className="h-4 w-4" />
            </div>
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[40%] cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-1">Password tidak sama</div>
          )}
          {/* error message */}
          {errorRegister && (
            <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
          )}
          {/* Tombol Registrasi */}
          <button
            type="submit"
            className={`w-full text-white bg-[#FF2929] p-3 mt-10 rounded-md ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Registrasi"}
          </button>
        </form>
        <div className="flex justify-center mt-5">
          <h1 className="text-black text-sm">
            Sudah punya akun?{" "}
            <a href="/login" className="text-[#FF2929]">
              disini
            </a>
          </h1>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <img
          src="../../../../assets/bglogin.png"
          alt=""
          className="h-[900px] w-[765px]"
        />
      </div>
    </div>
  );
}
