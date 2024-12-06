import { useState } from "react";

type ProfileSaldoProps = {
  profile: {
    profile_image?: string;
    first_name?: string;
    last_name?: string;
  };
  balance: {
    balance?: number;
  };
};
export default function ProfileSaldo({ profile, balance }: ProfileSaldoProps) {
  const [showBalance, setShowBalance] = useState(false);
  const token = localStorage.getItem("token");
  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID").format(amount);
  return (
    <div className="px-24 mt-10 md:flex justify-between">
      {token ? (
        <div>
          <img
            src={profile?.profile_image}
            alt="Profile"
            className="h-16 w-16 rounded-full"
          />
          <div className="text-sm mt-10">Selamat Datang,</div>
          <div className="font-semibold md:text-2xl">
            {(profile?.first_name ?? "") + " " + (profile?.last_name ?? "")}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold">Selamat Datang</h1>
          <p>Silahkan login untuk melihat saldo anda</p>
        </div>
      )}
      <div className="relative">
        <div className="absolute lg:left-7 md:left-4 top-7 z-10 text-white">
          <h1>Saldo anda</h1>
          <div className="flex items-center text-2xl font-medium mt-2">
            <span className="mr-2 mb-[2px]">Rp</span>
            <span>
              {showBalance
                ? formatRupiah(balance?.balance || 0) // Tampilkan saldo dalam format ribuan
                : "••••••••"}
            </span>
          </div>
          <div>
            <button
              onClick={() => setShowBalance(!showBalance)} // Toggle saldo
              className=" text-white md:mt-[22px] text-xs "
            >
              {showBalance ? "Tutup Saldo " : "Lihat Saldo "}
            </button>
            {/* {!showBalance && (
            <div className="rotate-45 absolute top-[79.5px] md:left-[66px] left-[74px]">
              __
            </div>
          )} */}
          </div>
        </div>
        <div className="relative left-0 ">
          <img
            src="/assets/BackgroundSaldo.png"
            alt=""
            className="w-[670px] h-[161px]"
          />
        </div>
      </div>
    </div>
  );
}
