import { Link } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("token");

  const currentPath = window.location.pathname;
  console.log("currentPath", currentPath);

  return (
    <header className="flex px-24 justify-between mt-5 pb-3 border-b border-gray-300">
      <div className="flex gap-2">
        <img src="../../../assets/logo.png" alt="" />
        <h1 className="font-semibold text-lg flex flex-col justify-center">
          <Link to="/">SIMS PPOB</Link>
        </h1>
      </div>
      <div className="flex gap-5 text-sm font-medium mt-1">
        {token ? (
          <>
            <Link
              to="/top-up"
              className={`
              ${currentPath === "/top-up" ? "text-orange-600" : ""}
              `}
            >
              Top Up
            </Link>
            <Link
              to="/transaksi"
              className={`${
                currentPath === "/transaksi" ? "text-orange-600" : ""
              }`}
            >
              Transaction
            </Link>
            <Link
              to="/account"
              className={`${
                currentPath === "/account" ? "text-orange-600" : ""
              }`}
            >
              Akun
            </Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
