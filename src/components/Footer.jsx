import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const marketplaceList = [
  {
    name: "All NFTs",
    link: "/",
  },
  {
    name: "Art",
    link: "/",
  },
  {
    name: "Music",
    link: "/",
  },
  {
    name: "Domain Names",
    link: "/",
  },
  {
    name: "Virtual Worlds",
    link: "/",
  },
  {
    name: "Collectibles",
    link: "/",
  },
];

const resourcesList = [
  {
    name: "Help Center",
    link: "/",
  },
  {
    name: "Partners",
    link: "/",
  },
  {
    name: "Suggestions",
    link: "/",
  },
  {
    name: "Discord",
    link: "/",
  },
  {
    name: "Docs",
    link: "/",
  },
  {
    name: "Newsletter",
    link: "/",
  },
];

const communityList = [
  {
    name: "Community",
    link: "/",
  },
  {
    name: "Documentation",
    link: "/",
  },
  {
    name: "Brand Assets",
    link: "/",
  },
  {
    name: "Blog",
    link: "/",
  },
  {
    name: "Forum",
    link: "/",
  },
  {
    name: "Mailing List",
    link: "/",
  },
];

const socialLinks = [
  {
    id: 1,
    icon: <FaFacebookF className="text-white text-lg" />,
    link: "#",
  },
  {
    id: 2,
    icon: <BsTwitter className="text-white text-lg" />,
    link: "#",
  },
  {
    id: 3,
    icon: <FaLinkedinIn className="text-white text-lg" />,
    link: "#",
  },
];
const Footer = () => {
  return (
    <footer className="bg-[#242435] pt-16 sm:text-left">
      <div className="px-5 sm:px-10 lg:px-5 xl:px-16 lg:container lg:mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* ----Market place---- */}
          <div>
            <h1 className="font-medium text-white text-lg mb-5">Marketplace</h1>
            <ul>
              {marketplaceList.map((market) => (
                <div
                  key={market.name}
                  className="flex justify-center sm:justify-start"
                >
                  <li
                    key={market.name}
                    className="text-slate-400 mt-2 cursor-pointer hover:text-purpleR"
                  >
                    {market.name}
                  </li>
                </div>
              ))}
            </ul>
          </div>

          {/* ----Resources place---- */}
          <div>
            <h1 className="font-medium text-white text-lg mb-5 mt-5 sm:mt-0">
              Resources
            </h1>
            <ul>
              {resourcesList.map((resource) => (
                <div
                  key={resource.name}
                  className="flex justify-center sm:justify-start"
                >
                  <li
                    key={resource.name}
                    className="text-slate-400 mt-2 cursor-pointer hover:text-purpleR"
                  >
                    {resource.name}
                  </li>
                </div>
              ))}
            </ul>
          </div>

          {/* ----Community place---- */}
          <div>
            <h1 className="font-medium text-white text-lg mb-5 mt-5 sm:mt-0">
              Community
            </h1>
            <ul>
              {communityList.map((community) => (
                <div
                  key={community.name}
                  className="flex justify-center sm:justify-start"
                >
                  <li
                    key={community.name}
                    className="text-slate-400 mt-2 cursor-pointer hover:text-purpleR"
                  >
                    {community.name}
                  </li>
                </div>
              ))}
            </ul>
          </div>

          {/* ----Newsletter---- */}
          <div>
            <h1 className="font-medium text-white text-lg mb-5 mt-5 sm:mt-0">
              Newsletter
            </h1>
            <p className="text-slate-400">
              Signup for our newsletter to get the latest news in your inbox.
            </p>

            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Enter your email"
                className="py-1.5 pl-3 rounded-full w-full focus:outline-none bg-[#3A3A4A] text-white"
              />
              <button className="py-1 px-3 rounded-r-full -ml-10 bg-gradient-to-r from-purpleR to-purple-700">
                <HiOutlineArrowNarrowRight className="text-3xl text-white" />
              </button>
            </div>

            <p className="text-slate-400 text-sm mt-4">
              Your email is safe with us. We don't spam.
            </p>
          </div>
        </div>
      </div>

      <hr className="border border-slate-700 mt-16" />

      <div className="px-5 sm:px-10 lg:px-5 xl:px-16 lg:container lg:mx-auto">
        <div className="sm:flex justify-between items-center py-8">
          <p className="text-center text-slate-400">
            &copy; Copyright {new Date().getFullYear()} - Reward Miner
          </p>

          <div className="flex items-center justify-center sm:justify-start space-x-3 mt-5 sm:mt-0">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.link}
                className="p-2 bg-[#14141F] rounded"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
