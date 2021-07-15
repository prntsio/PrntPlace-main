import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { FaWallet, FaSignOutAlt } from 'react-icons/fa';
import Header from './components/Header/Header';
import Home from './views/Home';
import Artworks from './views/Artworks';
import Artists from './views/Artists';
import ProfilePage from './views/ProfilePage';
import Art from './views/Art';
import Create from './views/Create';
import EditProfile from './views/EditProfile';
import RequestForApproval from './views/RequestForApproval';
import ProtectedRoute from './utils/ProtectedRoute';

import './App.css';
import Footer from './components/Footer/Footer';

import Web3Modal from 'web3modal';
import web3 from './ethereum/web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { WalletLink } from 'walletlink';

import coinbaseLogo from './assets/images/coinbase-wallet-logo.svg';
import NotApproved from './components/Create/NotApproved/NotApproved';

const axios = require('axios');

let provider;
const infuraId = process.env.REACT_APP_INFURA_ID;

console.log('INFURA_ID', infuraId);

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: infuraId, // required
        },
    },
    'custom-walletlink': {
        package: WalletLink,
        display: {
            logo: coinbaseLogo,
            name: 'Coinbase Wallet',
            description: 'Scan with WalletLink to connect',
        },
        options: {
            appName: 'Prnts',
            networkUrl: `https://mainnet.infura.io/v3/${infuraId}`,
            chainId: 1,
        },
        connector: async (_, options) => {
            const { appName, networkUrl, chainId } = options;
            const walletLink = new WalletLink({
                appName,
            });
            const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
            await provider.enable();
            return provider;
        },
    },
};

const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
});

const App = () => {
    const [account, setaccount] = useState('');
    const [windowDimension, setWindowDimension] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const IsMobile = windowDimension <= 700;

    // useEffect(() => {
    //   onConnectWallet();
    // }, [])

    useEffect(() => {
        onConnectWallet();
        const getAccount = async () => {
            console.log(web3);
            const accounts = await web3.eth.getAccounts();
            console.log('account in header: ', accounts[0]);
            // setaccount(accounts[0]);
        };
        getAccount();
        setWindowDimension(window.innerWidth);
        setIsMobile(IsMobile);
    }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        function handleResize() {
            setWindowDimension(window.innerWidth);
        }
        setIsMobile(IsMobile);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [IsMobile]);

    useEffect(() => {
        async function listenMMAccount() {
            try {
                window.ethereum.on('accountsChanged', async function () {
                    // Time to reload your interface with accounts[0]!
                    const account = await web3.eth.getAccounts();
                    setaccount(account[0]);
                    // accounts = await web3.eth.getAccounts();
                    console.log(account);
                });
            } catch (err) {
                console.log('Browser wallet not installed!');
            }
        }
        listenMMAccount();
    }, []);

    const onConnectWallet = async () => {
        console.log('connecting wallet...');
        console.log('cached provider', web3Modal.cachedProvider);
        try {
            provider = await web3Modal.connect();
        } catch (err) {
            console.log('Could not get a wallet connection', err);
            return;
        }
        web3.setProvider(provider);
        // setweb(web3);
        const accounts = await web3.eth.getAccounts();
        setaccount(accounts[0]);
        // console.log("accounts[0]", accounts[0]);
        // console.log("after setProvider", web3);
        // console.log("cached provider on connect: ", web3Modal.cachedProvider)
        // console.log("web3 on mount", web3);
        // console.log("provider",web3.currentProvider);
        // window.location.reload();
    };

    const onDisconnect = async (e) => {
        e.preventDefault();
        // let provider = web3.currentProvider;
        // if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
        //   if(!(account === "" || typeof account === "undefined")) {
        //     // setaccount("");
        //     const permissions = await window.ethereum.request({
        //       method: "wallet_requestPermissions",
        //       params: [
        //         {
        //           eth_accounts: {}
        //         }
        //       ]
        //     });
        //     console.log("wallet_requestPermissions", permissions)
        //   }
        // }

        console.log(
            'cached provider before provider.close(): ',
            web3Modal.cachedProvider
        );
        console.log('Killing the session', web3.currentProvider);
        console.log('web3.givenProvider', web3.givenProvider);

        if (web3 && web3.currentProvider && web3.currentProvider.close) {
            await web3.currentProvider.close();
        }

        console.log(
            'cached provider after provider.close(): ',
            web3Modal.cachedProvider
        );
        web3Modal.clearCachedProvider();
        console.log('cached provider after clear: ', web3Modal.cachedProvider);
        provider = null;
        // setaccount("");
        window.location.reload();
    };

    const [isApproved, setIsApproved] = useState(false);

    const getIsApproved = async () => {
        const url = `https://prnts-music-nfts.herokuapp.com/api/approvalRequests/${account}/isApproved`;
        try {
            const res = await axios.get(url);
            setIsApproved(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getIsApproved();
    });

    return (
        <BrowserRouter history={createBrowserHistory}>
            <div>
                <div
                    style={{
                        backgroundColor: '#e9eff0',
                        boxShadow:
                            '3px 1.5px 12px #e0e5e6, -5px -5px 12px #f2f9fa',
                        borderBottomLeftRadius: '40px',
                        borderBottomRightRadius: '40px',
                        // borderRadius: "50px",
                        position: 'sticky',
                        top: '0',
                        zIndex: '2',
                        // overflow: 'hidden',
                        // marginBottom: '10px'
                    }}
                >
                    <Header account={account} isMobile={isMobile} />
                    <div
                        style={{
                            // marginLeft: "0px",
                            // right: "15px",
                            // top: "15px",
                            position: 'absolute',
                            zIndex: '1',
                            padding: '15px 15px',
                            // marginLeft: "0px"
                            right: '2vw',
                            top: '1.45vh',
                            // left: "100px"
                        }}
                    >
                        {account === '' || typeof account === 'undefined' ? (
                            isMobile ? (
                                <div
                                    className="btn"
                                    style={{
                                        top: '1vh',
                                        right: '2vw',
                                        position: 'fixed',
                                        // blockSize: 'smaller'
                                        zoom: '90%',
                                    }}
                                >
                                    <FaWallet
                                        onClick={() => onConnectWallet()}
                                    />
                                </div>
                            ) : (
                                <button
                                    className="btn"
                                    style={{
                                        // marginLeft: "0px",
                                        // right: "15px",
                                        // top: "15px",
                                        position: 'absolute',
                                        zIndex: '1',
                                        // padding: '15px 15px',
                                        // marginLeft: "0px"
                                        right: '2vw',
                                        top: '1.45vh',
                                        // left: "100px"
                                    }}
                                    onClick={() => onConnectWallet()}
                                >
                                    <h4>
                                        <span>Wallet</span>
                                    </h4>
                                </button>
                            )
                        ) : (
                            <h4
                                style={{
                                    top: '1vh',
                                    left: `${isMobile ? '4vw' : '2vw'}`,
                                    position: 'fixed',
                                    margin: '5px 0px',
                                    zoom: `${isMobile ? '85%' : '100%'}`,
                                }}
                                className="btn"
                                onClick={onDisconnect}
                            >
                                <FaSignOutAlt size={13} />
                            </h4>
                        )}
                    </div>
                    {/* <div
            style={{
              margin: '80px 10px',
            }}
          /> */}
                </div>

                {/* <button className="btn" onClick={() => console.log(account)}>Account</button> */}
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <Route path="/music" exact component={() => <Artworks />} />
                    <Route
                        path="/artists"
                        exact
                        component={() => <Artists />}
                    />
                    <Route
                        path="/music/:id/:tokenId"
                        exact
                        component={() => <Art account={account} />}
                    />
                    <Route
                        path="/artists/:id"
                        exact
                        component={() => (
                            <ProfilePage
                                account={account}
                                isMobile={isMobile}
                            />
                        )}
                    />
                    <ProtectedRoute
                        path="/create"
                        exact
                        isAuth={isApproved}
                        component={() => (
                            <Create account={account} isMobile={isMobile} />
                        )}
                        extraComponent={() => <NotApproved account={account} />}
                        account={account}
                    />
                    <ProtectedRoute
                        path="/artists/:id/edit-profile"
                        exact
                        isAuth={true}
                        component={() => <EditProfile account={account} />}
                        extraComponent={() => null}
                        account={account}
                    />
                    <ProtectedRoute
                        path="/artists/:id/request-for-approval"
                        exact
                        isAuth={isApproved}
                        component={(props) => (
                            <Redirect
                                to={{
                                    pathname: '/create',
                                    state: { from: props.location },
                                }}
                            />
                        )}
                        extraComponent={() => (
                            <RequestForApproval account={account} />
                        )}
                        account={account}
                    />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
