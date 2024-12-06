import { useEffect, useState } from "react";
import { MdOutlineMoney } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { bayarTransaksi } from "../store/reducers/transactionReducer";
import { getBalance, getProfile } from "../store/reducers/authReducers";

export default function Pembelian() {
  const { code } = useParams();
  const location = useLocation();
  const { service_name, service_icon, service_tariff } = location.state || {};
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, [dispatch]);


  const formatRupiahInput = (amount: number) =>
    new Intl.NumberFormat("id-ID").format(amount);

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  console.log("code", code);

  const handleTransakasi = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      service_code: code,
    };
    try {
      const result = await dispatch(bayarTransaksi(payload)).unwrap();
      console.log("result", result);
      setSuccess(true);
    } catch (err) {
      console.log("error", err);
      setError(true);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSuccess(false);
    setError(false);
  };

  return (
    <div className="px-24 mt-10">
      <h1>PemBayaran</h1>
      <div className="flex gap-3 mt-2">
        <img src={service_icon} alt="" className="w-10 h-10" />
        <h1 className="flex flex-col justify-center font-semibold">
          {service_name}
        </h1>
      </div>
      <div className="w-full mt-12">
        <div className="relative">
          <div className="w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded">
            {formatRupiahInput(service_tariff)}
          </div>
          <div
            className={`${
              service_tariff ? "text-black" : "text-gray-400"
            } absolute left-3 top-[22px] transform -translate-y-1/2 `}
          >
            <MdOutlineMoney className="h-4 w-4" size={5} />
          </div>
        </div>
        <button
          className={`${
            service_tariff ? "bg-[#FF2929] " : "bg-gray-400"
          } text-center w-full py-[9.5px] mt-3 rounded text-white font-semibold`}
          disabled={!service_tariff}
          onClick={() => setShowModal(true)}
        >
          <h1>Bayar</h1>
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-4 rounded-lg w-[250px]">
            <div className="flex justify-center mt-3">
              {success && (
                <img src="/assets/ceklist.png" alt="" className="w-16 h-15" />
              )}
              {error && (
                <img src="/assets/error.png" alt="" className="w-16 h-15" />
              )}
              {!success && !error && (
                <img src="/assets/logo.png" alt="" className="w-16 h-15" />
              )}
            </div>
            <h1 className="text-sm text-center mt-3 ">
              {success && (
                <div>Pembayaran {service_name.toLowerCase()} sebesar</div>
              )}{" "}
              {error && (
                <div>Pembayaran {service_name.toLowerCase()} sebesar</div>
              )}{" "}
              {!success && !error && (
                <div>Beli {service_name.toLowerCase()} sebesar</div>
              )}
            </h1>
            <h2 className="text-xl font-semibold text-center">
              {success && formatRupiah(service_tariff)}
              {error && formatRupiah(service_tariff)}
              {!success && !error && formatRupiah(service_tariff) + " ?"}
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
                onClick={handleTransakasi}
                className="text-red-500 text-center text-sm py-2 mt-3 rounded cursor-pointer"
              >
                <h1>Ya, lanjutkan Bayar</h1>
              </div>
            )}
            {success && (
              <div
                onClick={handleCloseModal}
                className="text-red-500 text-center text-sm py-2 rounded cursor-pointer"
              >
                Kembali ke beranda
              </div>
            )}
            {error && (
              <div
                onClick={handleCloseModal}
                className="text-red-500 text-center text-sm py-2 rounded cursor-pointer"
              >
                Kembali ke beranda
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
    </div>
  );
}
