import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Minting from "./pages/Minting";
import Wallets from './sections/Wallets';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Create from "./pages/Create";
import Notification from "./components/Notification";
import Profile from './pages/profile'
import Explore from "./pages/Explore";
import Media from "./pages/Media";

import { getUserData } from "./redux/actions/UserAction";
import { logout } from "./redux/actions/AuthAction";
import web3connect from './utils/web3connect';

function App({ notification, refresh, getUserData, logout, user }) {
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(0);
  async function fecthChainId() {
    const _chainId = Number(await window.ethereum.request({ method: 'eth_chainId' }));

    setChainId(_chainId);
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async function (accounts) {
        console.log("AccountChanged");
        setAddress(await web3connect());
      });
      window.ethereum.on('networkChanged', async function (networkId) {
        // Time to reload your interface with the new networkId
        // setAddress(await web3connect());
        console.log(networkId);
        setChainId(networkId);
      })
    }
    fecthChainId();
  }, [window.ethereum])

  console.log(chainId);
  useEffect(() => {
    const _address = localStorage.getItem('account');
    console.log(_address);
    if (_address !== 'null') {
      try {
        onConnect(_address);
      }
      catch (error) {
        console.log(error);
      }
    }
  }, [refresh])

  const onConnect = async (_address) => {
    try {
      const address = await web3connect();
      console.log(address);
      if (address) setAddress(address);
      if (_address === 'null')
        return;
      if (address === _address) {
        getUserData(_address);
      }
      else {
        logout();
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar address={address} setAddress={setAddress} user={user} chainId={chainId} />
      <Routes>
        <Route path="/" element={<Main chainId={chainId} />} />
        {/* <Route path="explore" element={<Minting />} /> */}
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/login" element={<Login setAddress={setAddress} address={address} user={user} />} chainId={chainId} />
        <Route path="/register" element={<Register setAddress={setAddress} address={address} user={user} chainId={chainId} />} />
        <Route path="/create" element={<Create setAddress={setAddress} address={address} user={user} chainId={chainId} />} />
        <Route path="/explore" element={<Explore setAddress={setAddress} address={address} user={user} chainId={chainId} />} />
        <Route path="/media/:id" element={<Media setAddress={setAddress} address={address} user={user} chainId={chainId} />} />
        {user ? < Route path="/profile" element={<Profile setAddress={setAddress} address={address} user={user} />} /> : ''}
        {!user ?
          <Route path="/profile" element={<Navigate replace to="/wallets" />} />
          : ''}
      </Routes>
      <Footer />
      <Notification data={notification} />
    </>
  );
}
const fromStore = (store) => {
  return {
    refresh: store.NotificationReducer.refresh,
    notification: store.NotificationReducer.notification,
    user: store.UserReducer.user
  }
}
export default connect(fromStore, { logout, getUserData })(App);
