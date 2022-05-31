import React from "react";
import { TiTick } from "react-icons/ti";

const Card = (props) => {
  return (
    <div className="bg-blackR pb-6 rounded-2xl shadow-lg group text-center">
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={props.image}
          alt="nft"
          className="object-fill rounded-t-2xl cursor-pointer group-hover:scale-105 transition ease-linear duration-500"
        />
      </div>

      {/* ---Avatar--- */}
      <div className="flex justify-center">
        <div className="-mt-7 cursor-pointer">
          <div className="relative">
            <img
              src={props.avatar}
              alt="author"
              className="rounded-full h-14"
            />
            <div className="bg-purpleR p-0.5 w-4 text-center rounded-full absolute -bottom-0.5 left-8">
              <TiTick className="text-xs" />
            </div>
          </div>
        </div>
      </div>

      <h1 className="font-semibold mt-4">{props.title}</h1>
      <p className="mt-2 text-slate-400 text-sm">{props.contract}</p>
    </div>
  );
};

export default Card;
