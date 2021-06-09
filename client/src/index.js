import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
// import {UseWalletProvider} from 'use-wallet'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    // <UseWalletProvider
    // chainId={42}
    // connectors={{
    //     injected: {
            
    //     },
    //     walletconnect: {
    //         // rpcUrl: "https://api.infura.io/v1/jsonrpc/kovan"
    //         rpcUrl: "https://kovan.infura.io/v3/55af5fb4b6fd4172a1eecfa69550e259"
    //         // rpcUrl: 'https://mainnet.eth.aragon.network/'
    //     },
    //     walletlink: {
    //         url: 'https://mainnet.eth.aragon.network/',
    //         appName: "Coinbase Wallet",
    //         appLogoUrl: ""
    //     }
    // }}
    // >
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    // </UseWalletProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
