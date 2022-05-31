import { BiWallet } from "react-icons/bi";
import { BsCloudUpload, BsTags } from "react-icons/bs";

const cardList = [
  {
    id: 1,
    icon: <BiWallet />,
    name: "Set up your wallet",
    info: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.",
  },
  {
    id: 2,
    icon: <BsCloudUpload />,
    name: "Add your NFT's",
    info: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.",
  },
  {
    id: 3,
    icon: <BsTags />,
    name: "Sell your NFT's",
    info: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.",
  },
];

const CreateAndSell = () => {
  return (
    <section className="pb-20">
      <h1 className="text-4xl font-semibold text-center">Create and Sell</h1>
      <hr className="w-14 border border-purpleR mx-auto my-5" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {cardList.map((card) => (
          <div
            key={card.id}
            className="bg-blackR p-10 rounded-xl shadow-lg group"
          >
            <div className="text-3xl bg-gradient-to-r from-purpleR to-purple-700 w-14 p-3 text-center rounded-lg group-hover:-translate-y-2 transition ease-linear duration-300">
              {card.icon}
            </div>
            <h1 className="mt-5 text-xl font-semibold">{card.name}</h1>
            <p className="mt-3 mb-5 text-slate-400 group-hover:text-white transition ease-linear duration-300">
              {card.info}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreateAndSell;
