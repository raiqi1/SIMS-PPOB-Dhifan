
export default function Header() {
  return (
    <header className="flex px-24 justify-between mt-5 pb-3 border-b border-gray-300">
      <div className="flex gap-2">
        <img src="../../../assets/logo.png" alt="" />
        <h1 className="font-semibold text-lg flex flex-col justify-center">
          SIMS PPOB
        </h1>
      </div>
      <div className="flex gap-5 text-sm font-medium mt-1">
        <a href="/top-up">Top Up</a>
        <a href="/transaksi">Transaction</a>
        <a href="/account">Akun</a>
      </div>
    </header>
  );
}
