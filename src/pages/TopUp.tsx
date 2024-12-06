/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile, getBalance } from "../store/reducers/authReducers";
import type { AppDispatch } from "../store";
import { MdOutlineMoney } from "react-icons/md";
import { topup } from "../store/reducers/transactionReducer";
import { Link } from "react-router-dom";

export default function TopUp() {
  const dispatch = useDispatch<AppDispatch>();
  const [amount, setAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const listUang = [10000, 20000, 50000, 100000, 250000, 500000];
  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const formatRupiahInput = (amount: number) =>
    new Intl.NumberFormat("id-ID").format(amount);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, [dispatch]);

  const handleSelectAmount = (uang: number) => {
    setAmount(uang);
    setSelectedAmount(uang);
  };

  const handleTopUp = async (e: any) => {
    e.preventDefault();
    const payload = {
      top_up_amount: amount,
    };
    try {
      const response = await dispatch(topup(payload)).unwrap();
      console.log("response", response);
      setSuccess(true);
      dispatch(getBalance());
    } catch (err: any) {
      console.error("Top Up failed:", err);
      setError(err);
    }
  };

  function handleCloseModal() {
    setShowModal(false);
    setAmount(0);
    setSelectedAmount(null);
    setSuccess(false);
    setError(false);
  }

  return (
    <div>
      <div className="px-24 mt-20">
        <div>
          <h1>Silahkan masukkan</h1>
          <h2 className="text-2xl font-bold">Nominal Top Up</h2>
        </div>
        <div className="flex">
          <div className="w-full">
            <div className="relative">
              <div className="w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded">
                {formatRupiahInput(amount)}
              </div>
              <div
                className={`${
                  amount ? "text-black" : "text-gray-400"
                } absolute left-3 top-[22px] transform -translate-y-1/2 `}
              >
                <MdOutlineMoney className="h-4 w-4" size={5} />
              </div>
            </div>
            <button
              className={`${
                amount ? "bg-[#FF2929] " : "bg-gray-400"
              } text-center w-full py-[9.5px] mt-3 rounded text-white font-semibold`}
              disabled={!amount}
              onClick={() => setShowModal(true)}
            >
              <h1>Top Up</h1>
            </button>
          </div>
          {showModal && (
            <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg w-[250px]">
                <div className="flex justify-center mt-3">
                  {success && (
                    <img
                      src="/assets/ceklist.png"
                      alt=""
                      className="w-16 h-15"
                    />
                  )}
                  {error && (
                    <img src="/assets/error.png" alt="" className="w-16 h-15" />
                  )}
                  {!success && !error && (
                    <img src="/assets/logo.png" alt="" className="w-16 h-15" />
                  )}
                </div>
                <h1 className="text-sm text-center mt-3 ">
                  {success && "Top Up sebesar"} {error && "Top Up sebesar"}{" "}
                  {!success && !error && "Anda yakin untuk  Top Up sebesar"}
                </h1>
                <h2 className="text-xl font-semibold text-center">
                  {success && formatRupiah(amount)}
                  {error && formatRupiah(amount)}
                  {!success && !error && formatRupiah(amount) + " ?"}
                </h2>
                {success && (
                  <div>
                    <h1 className=" text-center text-sm mt-3">Berhasil</h1>
                  </div>
                )}
                {error && (
                  <div>
                    <h1 className=" text-center text-sm mt-3">gagal</h1>
                  </div>
                )}
                {!success && !error && (
                  <div
                    onClick={handleTopUp}
                    className="text-red-500 text-center text-sm py-2 mt-3 rounded cursor-pointer"
                  >
                    <h1>Ya, lanjutkan Top Up</h1>
                  </div>
                )}
                {success && (
                  <div
                    onClick={handleCloseModal}
                    className="text-red-500 text-center text-sm py-2 rounded cursor-pointer"
                  >
                    <Link to="/">Kembali ke beranda</Link>
                  </div>
                )}
                {error && (
                  <div
                    onClick={handleCloseModal}
                    className="text-red-500 text-center text-sm py-2 rounded cursor-pointer"
                  >
                    <Link to="/">Kembali ke beranda</Link>
                  </div>
                )}
                {!success && !error && (
                  <div
                    onClick={handleCloseModal}
                    className="text-gray-400 text-center text-sm py-2 rounded cursor-pointer"
                  >
                    <h1>Batalkan</h1>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {listUang?.map((uang, index) => (
              <button
                key={index}
                onClick={() => handleSelectAmount(uang)}
                className={`p-2 rounded gap-2 w-[100px] text-center text-sm text-gray-600  h-[43px] mt-1 ml-3 ${
                  selectedAmount === uang
                    ? "border border-black text-black"
                    : "border border-gray-300 "
                }`}
              >
                {formatRupiah(uang)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
