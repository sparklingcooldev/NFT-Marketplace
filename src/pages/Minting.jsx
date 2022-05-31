import { useState } from "react";
import img1 from "../assets/images/static-1.jpg";
import img2 from "../assets/images/static-5.jpg";
import author1 from "../assets/avatars/author-1.jpg";
import author10 from "../assets/avatars/author-10.jpg";
import author11 from "../assets/avatars/author-11.jpg";
import author9 from "../assets/avatars/author-9.jpg";
import { TiTick } from "react-icons/ti";

const nftList = [
  {
    id: 1,
    avatar: author1,
    image: img1,
    name: "Pinky Ocean",
  },
  {
    id: 2,
    avatar: author10,
    image: img2,
    name: "Red Ocean",
  },
  {
    id: 3,
    avatar: author11,
    image: img1,
    name: "Pinky Ocean",
  },
  {
    id: 4,
    avatar: author9,
    image: img2,
    name: "Red Ocean",
  },
];

const Minting = () => {
  const [metamaskConnect, setMetamaskConnect] = useState(false);

  return (
    <>
      <section className="bg-mint bg-center bg-cover bg-no-repeat">
        <h1 className="px-5 py-40 text-5xl font-bold text-white">
          NFT Minting
        </h1>
      </section>

      <section className="bg-[#1A1A25] py-20">
        <div className="px-5 sm:px-10 lg:px-5 xl:px-16 lg:container lg:mx-auto text-white text-left">
          <h1 className="text-4xl font-medium">Mint your NFT</h1>
          {metamaskConnect ? (
            <>
              <p className="mt-5 truncate">
                Connected Address: 0x8f6d9731b47830b028c7d50ec81066f7f720475a
              </p>
              <button className="mt-8 py-2 px-8 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-sm hover:shadow-purple-800 rounded-md">
                Switch to manual input
              </button>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">
                {nftList.map((nft) => (
                  <div key={nft.id} className="bg-blackR p-5 rounded-xl">
                    <div className="relative">
                      <img
                        src={nft.image}
                        alt="nft"
                        className="object-fill rounded-xl mt-8 mx-auto"
                      />

                      <div className="cursor-pointer absolute -top-6">
                        <div className="relative">
                          <img
                            src={nft.avatar}
                            alt="author"
                            className="rounded-full h-12 hover:border-2 border-purpleR"
                          />
                          <div className="bg-purpleR p-0.5 w-4 text-center rounded-full absolute -bottom-0.5 left-8">
                            <TiTick className="text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <h1 className="font-medium mt-5">{nft.name}</h1>
                    <button className="text-purple-600 font-medium mt-3">
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setMetamaskConnect(true)}
                className="mt-8 py-2 px-8 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-sm hover:shadow-purple-800 rounded-md"
              >
                Connect Metamask
              </button>
              <p className="mt-8 font-light">
                Connect to metamask to start minting
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Minting;
