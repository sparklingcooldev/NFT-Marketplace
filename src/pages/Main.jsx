import CreateAndSell from "../sections/CreateAndSell";
import Hero from "../sections/Hero";
import HotCollections from "../sections/HotCollections";
import NewItems from "../sections/NewItems";
import TopSellers from "../sections/TopSellers";
import Wallets from "../sections/Wallets";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";

const Main = ({ chainId }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 250) {
      setVisible(true);
    } else if (scrolled <= 250) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div id="home" className="text-left">
      <Hero chainId={chainId} />
      <div className="bg-[#1A1A25]">
        <div className="px-5 sm:px-10 lg:px-5 xl:px-16 lg:container lg:mx-auto text-white">
          {/* <Wallets /> */}
          <NewItems />
          <HotCollections />
          <TopSellers />
          <CreateAndSell />
        </div>
      </div>

      {/* -----Button to top---- */}
      {visible && (
        <a
          href="#home"
          className="bg-gradient-to-r from-purpleR to-purple-700 rounded-full p-1 fixed bottom-8 right-5 shadow-lg z-50"
        >
          <MdOutlineKeyboardArrowUp className=" text-2xl font-bold text-white" />
        </a>
      )}
    </div>
  );
};

export default Main;
