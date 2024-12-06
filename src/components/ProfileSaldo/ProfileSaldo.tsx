import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type ProfileSaldoProps = {
  profile: {
    profile_image: string;
    first_name: string;
    last_name: string;
  } | null;
  balance: {
    balance: number;
  } | null;
  loader: boolean;
};

export default function ProfileSaldo({
  profile,
  balance,
  loader,
}: ProfileSaldoProps) {
  const [showBalance, setShowBalance] = useState(false);
  const token = localStorage.getItem("token");
  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID").format(amount);

  return (
    <div className="px-24 mt-10 md:flex justify-between">
      {token ? (
        <div>
          {loader ? (
            <div className="">
              <Skeleton circle={true} height={64} width={64} />
              <div className="">
                <Skeleton width={100} height={16} />
                <Skeleton width={200} height={24} style={{ marginTop: 8 }} />
              </div>
            </div>
          ) : (
            <>
              <img
                src={profile?.profile_image}
                alt="Profile"
                className="h-16 w-16 rounded-full"
              />
              <div className="text-sm mt-10">Selamat Datang,</div>
              <div className="font-semibold md:text-2xl">
                {(profile?.first_name ?? "") + " " + (profile?.last_name ?? "")}
              </div>
            </>
          )}
        </div>
      ) : (
        // Jika user belum login
        <div>
          <h1 className="text-2xl font-semibold">Selamat Datang</h1>
          <p>Silahkan login untuk melihat saldo anda</p>
        </div>
      )}

      <div className="relative">
        {loader ? (
          // Loader untuk Background Saldo
          <div className="relative left-0">
            <Skeleton height={161} width={670} borderRadius={8} />
          </div>
        ) : (
          // Background Saldo
          <img
            src="/assets/BackgroundSaldo.png"
            alt="Saldo Background"
            className="w-[670px] h-[161px]"
          />
        )}

        {/* Informasi Saldo */}
        <div className="absolute lg:left-7 md:left-4 top-7 z-10 text-white">
          <h1>Saldo anda</h1>
          <div className="flex items-center text-2xl font-medium mt-2">
            <span className="mr-2 mb-[2px]">Rp</span>
            <span>
              {loader ? (
                <Skeleton width={100} height={24} />
              ) : showBalance ? (
                formatRupiah(balance?.balance || 0)
              ) : (
                "••••••••"
              )}
            </span>
          </div>
          <div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white md:mt-[22px] text-xs"
            >
              {showBalance ? "Tutup Saldo " : "Lihat Saldo "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
