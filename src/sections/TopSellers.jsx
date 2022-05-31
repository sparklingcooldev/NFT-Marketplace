import author1 from "../assets/avatars/author-1.jpg";
import author2 from "../assets/avatars/author-2.jpg";
import author3 from "../assets/avatars/author-3.jpg";
import author4 from "../assets/avatars/author-5.jpg";
import author5 from "../assets/avatars/author-9.jpg";
import author6 from "../assets/avatars/author-10.jpg";
import author7 from "../assets/avatars/author-11.jpg";
import author8 from "../assets/avatars/author-12.jpg";
import { TiTick } from "react-icons/ti";

const sellersList = [
  {
    id: 1,
    avatar: author1,
    name: "Monica Lucas",
    price: 3.2,
  },
  {
    id: 2,
    avatar: author2,
    name: "Lori Hart",
    price: 2.2,
  },
  {
    id: 3,
    avatar: author3,
    name: "Gayle Hicks",
    price: 1.5,
  },
  {
    id: 4,
    avatar: author4,
    name: "Stacy Long",
    price: 0.8,
  },
  {
    id: 5,
    avatar: author5,
    name: "Mamie Barnett",
    price: 2.8,
  },
  {
    id: 6,
    avatar: author6,
    name: "Jimmy Wright",
    price: 1.9,
  },
  {
    id: 7,
    avatar: author7,
    name: "Claude Banks",
    price: 1.2,
  },
  {
    id: 8,
    avatar: author8,
    name: "Ida Chapman",
    price: 3.2,
  },
  {
    id: 9,
    avatar: author1,
    name: "Monica Lucas",
    price: 3.2,
  },
  {
    id: 10,
    avatar: author5,
    name: "Monica Lucas",
    price: 3.2,
  },
  {
    id: 11,
    avatar: author8,
    name: "Monica Lucas",
    price: 3.2,
  },
  {
    id: 12,
    avatar: author6,
    name: "Monica Lucas",
    price: 3.2,
  },
];

const TopSellers = () => {
  return (
    <section className="pb-20">
      <h1 className="text-4xl font-semibold text-center">Top Sellers</h1>
      <hr className="w-14 border border-purpleR mx-auto my-5" />

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
        {sellersList.map((seller) => (
          <div key={seller.id} className="flex space-x-3">
            <p className="text-slate-400">{seller.id}.</p>

            <div className="cursor-pointer">
              <div className="relative">
                <img
                  src={seller.avatar}
                  alt="author"
                  className="rounded-full h-12 hover:border-2 border-purpleR"
                />
                <div className="bg-purpleR p-0.5 w-4 text-center rounded-full absolute -bottom-0.5 left-8">
                  <TiTick className="text-xs" />
                </div>
              </div>
            </div>

            <div>
              <h1 className="font-semibold cursor-pointer">{seller.name}</h1>
              <p className="text-slate-400 text-sm">{seller.price} ETH</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellers;
