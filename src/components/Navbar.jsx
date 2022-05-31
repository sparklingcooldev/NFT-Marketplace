import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import web3connect from '../utils/web3connect';
import { Box } from "@material-ui/core";
import styled from 'styled-components';
import { ethers } from "ethers";
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogout } from 'react-icons/md'
import { connect } from "react-redux";
import { logout } from "../redux/actions/AuthAction";

const navLinks = [
  {
    id: 1,
    name: "home",
    link: "/",
  },
  {
    id: 2,
    name: "explore",
    link: "/explore",
  },
  {
    id: 3,
    name: "author",
    link: "/",
  },
  {
    id: 4,
    name: "stats",
    link: "/stats",
  },
];

const Navbar = ({ user, logout, chainId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [balance, setBalance] = useState(0);
  const currency = { 97: 'BNB', 4: 'ETH', 80001: 'MATIC', 43113: 'AVAX' };
  useEffect(() => {
    if (!user) return;
    fetchBalance();
  }, [user])

  const fetchBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    var balance = await provider.getBalance(user.address) / Math.pow(10, 18);
    setBalance(balance);
  }

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  let ellipsis = user
    ? user.address.slice(0, 6) +
    "..." +
    user.address.substring(user.address.length - 6, user.address.length)
    : "Connect Wallet";

  return (
    <>
      <nav
        className={
          navbar
            ? "py-3 fixed inset-x-0 z-20 navbar-active transition ease-linear duration-300"
            : "py-3 fixed inset-x-0 z-20 transition ease-linear duration-300"
        }
      >
        <div className="px-5 sm:px-10 lg:px-5 xl:px-16 lg:container lg:mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <img
                src={logo}
                alt="logo"
                className="h-16 sm:h-20 cursor-pointer"
              />
              <div className="hidden lg:block">
                <input
                  type="text"
                  placeholder="search item here..."
                  className="px-3 py-1.5 text-white bg-[#494351] bg-opacity-60 rounded-full w-60 focus:outline-none ring-1 ring-purpleR"
                />
              </div>
            </div>
            <div className="hidden lg:block">
              <ul className="flex items-center">
                {navLinks.map((nav) => (
                  <Link to={nav.link} key={nav.id}>
                    <li
                      className={`${navbar && "font-semibold"
                        } text-white capitalize font-semibold cursor-pointer hover:border-b border-purpleR lg:mr-8`}
                    >
                      {nav.name}
                    </li>
                  </Link>
                ))}

                <button className="py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white mr-5">
                  <Link to={!user ? '/wallets' : '/create'}>
                    {!user ? 'Sign In' : 'Create'}
                  </Link>
                </button>
                {user ? <Box position={'relative'}>
                  <Logo>
                    <img src={user.avatar.length ? user.avatar : '/icons/unknown.png'} width={'100%'} height={'100%'} alt={'unknown'} />
                    <Dropdown >
                      <Box fontWeight={700}>{(user.username === '' ? 'Unknown' : user.username)}</Box>
                      <Box>
                        <Box fontWeight={700}>Balance</Box>
                        <Box color={'rgb(150,150,150)'}>{balance.toFixed(3)} {currency[chainId]}</Box>
                      </Box>
                      <Box borderBottom={'1px solid rgb(200,200,200)'}>
                        <Box fontWeight={700}>
                          My Wallet
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                          <Box color={'rgb(150,150,150)'}>
                            {ellipsis}
                          </Box>
                          <Box fontSize={'12px'} bgcolor={'rgb(100,100,100)'} borderRadius={'5px'} width={'50px'} height={'25px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>Copy</Box>
                        </Box>
                      </Box>

                      <Box >
                        <Link to={'/profile'}>
                          <Box display={'flex'} alignItems={'center'}>
                            <CgProfile fontSize={'20px'} />
                            <Box fontWeight={700} ml={'10px'}>
                              My Profile
                            </Box>
                          </Box>
                        </Link>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} onClick={() => logout()}>
                        <MdOutlineLogout fontSize={'20px'} />
                        <Box fontWeight={700} ml={'10px'}>
                          Logout
                        </Box>
                        <Box>
                        </Box>
                      </Box>
                    </Dropdown>
                  </Logo>
                </Box> : ''
                }

              </ul>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white bg-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {!isOpen ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* -------------Mobile menu----------- */}
          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <ul
                className={`py-3 space-y-5 text-center ${!navbar && "nav-glass mt-5"
                  } relative z-10`}
              >
                <div className="lg:hidden mt-3">
                  <input
                    type="text"
                    placeholder="search item here..."
                    className="px-3 py-1.5 text-white bg-[#494351] bg-opacity-60 rounded-full w-64 focus:outline-none ring-1 ring-purpleR"
                  />
                </div>
                {navLinks.map((nav) => (
                  <Link to={nav.link} key={nav.id}>
                    <li
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-white text-lg font-medium capitalize cursor-pointer py-3"
                    >
                      {nav.name}
                    </li>
                  </Link>
                ))}
                {!user ? < button className="py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white">
                  <Link to={'/wallets'}>
                    Sign In
                  </Link>
                </button> :
                  <Logo mx={'auto'}>
                    <img src={'/icons/unknown.png'} width={'20px'} height={'20px'} />
                  </Logo>
                }
              </ul>
            )}
          </Transition>
        </div >
      </nav >
    </>
  );
};

const Dropdown = styled(Box)`
  position : absolute;
  >div{
    color : white;
    font-size : 14px;
    margin : 0px 20px;
    padding : 10px 0px;
    text-align : left;
  }
  >div:first-child{
    padding-top : 20px;
  }
  >div:last-child{
    padding-bottom : 20px;
  }
  background-color : rgba(17, 14, 24, 0.9);
  border-radius : 5px;
  width : 200px;
  overflow : hidden;
  height : 0px;
  transition : height  0.3s;
  top : 50px;
  right : 0;
`;

const Logo = styled(Box)`
  width : 35px;
  height : 35px;
  >img{
    border-radius : 50%;
  }
  display : flex;
  justify-content : center;
  align-items :center;
  position : relative;
  cursor : pointer;
  :hover{
    >div{
      height : 270px;
    }
    
  }
`;

export default connect(null, { logout })(Navbar);
