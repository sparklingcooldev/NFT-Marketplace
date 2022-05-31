import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

import meta from "../assets/wallet/1.png";
import bit from "../assets/wallet/2.png";
import formatic from "../assets/wallet/3.png";
import connect from "../assets/wallet/4.png";
import coin from "../assets/wallet/5.png";
import ark from "../assets/wallet/6.png";

const walletLists = [
  {
    id: 1,
    name: "Metamask",
    logo: meta,
    link: '/login'
  },
  {
    id: 2,
    name: "Bitski",
    logo: bit,
    link: '/login'
  },
  {
    id: 3,
    name: "Fortmatic",
    logo: formatic,
    link: '/login'
  },
  {
    id: 4,
    name: "WalletConnect",
    logo: connect,
    link: '/login'
  },
  {
    id: 5,
    name: "Coinbase Wallet",
    logo: coin,
    link: '/login'
  },
  {
    id: 6,
    name: "Arkane",
    logo: ark,
    link: '/login'
  },
];

const Wallets = () => {
  return (
    <Box bgcolor={'#1A1A25'} minHeight = {'100vh'}>
      <section className="bg-mint bg-center bg-cover bg-no-repeat">
        <h1 className="px-5 py-40 text-5xl font-bold text-white">
          Wallets
        </h1>
      </section>
      <section className="py-20 px-20">
        <div className="grid sm:grid-cols-6 lg:grid-cols-12 gap-6">
          {walletLists.map((wallet) => (
            <button
              key={wallet.id}
              className="col-span-2 bg-blackR px-5 py-8 text-center rounded-2xl shadow-xl group hover:bg-gradient-to-t hover:from-purpleR hover:to-purple-700"
            >
              <Link to={wallet.link}>

                <img
                  src={wallet.logo}
                  alt="logo"
                  className="mx-auto group-hover:scale-125 transition ease-linear duration-300"
                />
                <h1 className="font-semibold mt-5 group-hover:scale-125 transition ease-linear duration-300 text-white">
                  {wallet.name}
                </h1>
              </Link>

            </button>
          ))}
        </div>
      </section>
    </Box >
  );
};

export default Wallets;
