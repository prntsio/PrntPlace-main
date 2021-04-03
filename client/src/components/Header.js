import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MetaMaskOnboarding from '@metamask/onboarding'
import web3 from '../ethereum/web3';
// import logo from '../img/logo.jpg';

const forwarderOrigin = 'http://localhost:3000';

const Header = () => {
    const [showConnect, setShowConnect] = useState(true);
    const [account, setaccount] = useState("");

    const initialize = () => {
        // console.log("button works")
        const onboardButton = document.getElementById("connect wallet");
        // console.log(onboardButton);
    
        const isMetaMaskInstalled = () => {
            //Have to check the ethereum binding on the window object to see if it's installed
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        };
    
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
    
            //This will start the onboarding proccess
        const onClickInstall = () => {
            onboardButton.innerText = 'Installation in progress...';
            onboardButton.disabled = true;
            //On this object we have startOnboarding which will start the onboarding process for our end user
            onboarding.startOnboarding();
        };
    
        const onClickConnect = async () => {
            try {
                // Will open the MetaMask UI
                // You should disable this button while the request is pending!
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setaccount(accounts[0])
                setShowConnect(false);
    
            } catch (error) {
              console.error(error);
            }
        };
    
        const MetaMaskClientCheck = () => {
            //Now we check to see if Metmask is installed
            if (!isMetaMaskInstalled()) {
                //If it isn't installed we ask the user to click to install it
                onboardButton.innerText = 'Install MetaMask!';
                //When the button is clicked we call th is function
                onboardButton.onclick = onClickInstall;
                //The button is now disabled
                onboardButton.disabled = false;
            } else {
                //If MetaMask is installed we ask the user to connect to their wallet
                onboardButton.innerText = 'Connect Wallet';
                //When the button is clicked we call this function to connect the users MetaMask Wallet
                onboardButton.onclick = onClickConnect;
                //The button is now disabled
                onboardButton.disabled = false;
            }
        };
        MetaMaskClientCheck();


        
    }
    
    window.addEventListener('DOMContentLoaded', initialize);

    // const getUserAddress = async () => {
    //     const accounts = await web3.eth.getAccounts();
    //     setaccount(accounts[0])
    // }

    // React.useEffect(() => {
    //     getUserAddress();
    //     return () => {
    //         // cleanup
    //     }
    // }, [showConnect])
    

    return (
        <header className='header'>
            {/* <h3 style={headingStyle}>{props.title}</h3> */}
            <Link to='/'>
                {/* <img style={{zoom: "15%"}} src={logo} alt="" /> */}
                <h1 style={logoStyle}><i>PRNTS</i></h1>
            </Link>
            
            <div className='nav-links'>
                <Link to='/'>
                    <h3 className="link-1">Home</h3>
                </Link>
                <Link to='/music'>
                    <h3 className="link-1">Music</h3>
                </Link>   
                <Link to='/artists'>
                    <h3 className="link-1">Artists</h3>
                </Link>
            </div>
            <div>
            { 
                showConnect 
                ?
                <button className="btn" id="connect wallet">Connect Wallet</button> 
                : 
                <div className="profile-links">
                    <Link to={`/artists/${account}`}><h4 className="link-2" >Profile</h4></Link> 
                    <Link to='/create'><h4 className="link-2">+Create</h4></Link>
                </div>
            }
            </div>
        </header>
    );
}

Header.defaultProps = {
    title: 'Music Nfts'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

const logoStyle = {
    color: 'black',
    letterSpacing: -2
}

export default Header