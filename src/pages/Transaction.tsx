/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryTransaksi } from "../store/reducers/historyReducer";
import { AppDispatch, RootState } from "../store";
import { getBalance, getProfile } from "../store/reducers/authReducers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Transaction = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactionHistory, loader, hasMore, errorMessage } = useSelector(
    (state: RootState) => state.history
  );

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, [dispatch]);

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  function formatTanggal(dateString: string): string {
    const date = new Date(dateString);

    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Jakarta",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formatted = new Intl.DateTimeFormat("id-ID", options).format(date);

    const [tanggalOnly, waktu] = formatted.split(" ");
    const [hari, bulanIndex, tahun] = tanggalOnly.split("/");
    const [jam, menit] = waktu.split(".");

    return `${hari.padStart(2, "0")} ${
      bulan[parseInt(bulanIndex) - 1]
    } ${tahun} ${jam}:${menit} WIB`;
  }

  useEffect(() => {
    dispatch(getHistoryTransaksi({ offset: 0, limit: 5 }));
  }, [dispatch]);

  const loadMoreTransactions = () => {
    if (hasMore && !loader) {
      dispatch(
        getHistoryTransaksi({ offset: transactionHistory.length, limit: 5 })
      );
    }
  };

  console.log("transactionHistory", transactionHistory);

  return (
    <div className="px-24 mt-10 mb-20">
      <h1 className="mb-5 font-semibold">Semua Transaksi</h1>
      <div className="flex flex-col gap-2">
        {loader ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border border-gray-300 p-3 rounded-md">
              <div className="px-2">
                <div className="flex justify-between">
                  <div className="text-lg font-semibold">
                    <Skeleton width={120} height={24} />
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  <Skeleton width={200} height={20} />
                </div>
                <div className="text-xs text-gray-400">
                  <Skeleton width={150} height={16} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {transactionHistory.length > 0 ? (
              transactionHistory.map((transaction: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-300 p-3 rounded-md"
                >
                  <div className="px-2">
                    <div className="flex justify-between">
                      <div
                        className={`text-lg font-semibold ${
                          transaction.transaction_type === "PAYMENT"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        <span className="mr-1">
                          {transaction.transaction_type === "PAYMENT"
                            ? "-"
                            : "+"}
                        </span>
                        {formatRupiah(transaction.total_amount)}
                      </div>
                      <div className="text-xs font-semibold opacity-65 mt-2">
                        {transaction.description}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatTanggal(transaction.created_on)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No transactions available</p>
            )}
          </>
        )}
      </div>
      {hasMore && !loader && (
        <div className=" text-center text-red-600 text-sm mt-2 font-semibold opacity-90">
          <button onClick={loadMoreTransactions}>Show more</button>
        </div>
      )}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default Transaction;
