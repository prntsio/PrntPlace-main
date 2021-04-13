import React, {useState, useEffect} from 'react';
import {FaBars, FaWallet} from 'react-icons/fa'
import PropTypes from 'prop-types';
import {Link, NavLink} from 'react-router-dom';
// import MetaMaskOnboarding from '@metamask/onboarding'
import web3 from '../ethereum/web3';
import styled from "styled-components";
import "../css/Dropdown.css";
// import logo from '../img/logo.jpg';

const Header = ({account}) => {
    const [windowDimension, setWindowDimension] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const IsMobile = windowDimension <= 700;

    const refreshPage = async () => {
        window.location.reload();   
    }

    useEffect(() => {
        const getAccount = async () => {
            console.log(web3)
            const accounts = await web3.eth.getAccounts();
            console.log("account in header: ", accounts[0])
        }
        getAccount();
        setWindowDimension(window.innerWidth);
        setIsMobile(IsMobile);
    }, []);
    
    useEffect(() => {
        function handleResize() {
            setWindowDimension(window.innerWidth);
        }
        setIsMobile(IsMobile);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [IsMobile]);

    

    const Navbar = {
        Wrapper: styled.nav`
            // flex: 1;
        
            // align-self: flex-start;
        
            // padding: 1rem 3rem;
        
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
        
            // background-color: white;
            // margin: 20px 40px 30px 20px;
            width: inherit;
            height: 65px;
            padding: 10px 10px 10px 30px;
            display: flex;
            color: white;
            align-items: center;
            justify-content: space-around;
        `,
        Logo: styled.h1`
          border: 1px solid gray;
          padding: 0.5rem 1rem;
          color: black;
          font-style: italic;
        `,
        Items: styled.ul`
        //   display: flex;
        //   list-style: none;
            width: 80%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;
            list-style: none;
        `,
        Item: styled.li`
        //   padding: 0 1rem;
        //   cursor: pointer;
        padding: 12px 24px;
        color: black;
        font-weight: bolder;
        border-radius: 24px;
        
        /* background: #d6dddd;
        box-shadow: 4px 5px 8px #bdbde8, 6px 8px 7px #efeff1; */
        background: rgb(233 239 240);
        box-shadow: 5px 5px 13px #e6e6e6, -5px -5px 13px #f4f4f4;
        `,
      };
    
    const MobileNavbar = {
        Wrapper: styled(Navbar.Wrapper)`
            width: 100vw;
            background: rgb(233 239 240);
            justify-content: center;
            // justify-items: center;
            padding: 10px 10px;
            margin-top: 10px;
            position: sticky;
            position: -webkit-sticky;
            top: 0;
        `,
        Items: styled(Navbar.Items)`
          flex: 1;
          padding: 0 2rem;
      
          justify-content: space-around;
        `,
        Item: styled(Navbar.Item)`
            padding: 8px 12px;
            font-size: 12px;
            border-radius: 15px;
        `,
      };

      

    return (
        <div>
        {
        isMobile
        ?
        (
        <MobileNavbar.Wrapper>
        <MobileNavbar.Items className="nav-links">
            {
                !(account === "" || typeof account === "undefined")
                ?
                (
                    <div className="dropdown">
                        <FaBars color="black" className="dropbtn" />
                        <div className="dropdown-content">
                            <div>
                                <div onClick={refreshPage}>
                                    <Link to={`/artists/${account}`}>
                                        <h4 
                                            // className="link-2"
                                            style={{
                                                padding: "10px 20px"
                                            }}
                                        >
                                            Profile
                                        </h4>
                                    </Link> 
                                </div>
                                <hr style={{margin: "0px 10px 0px 10px"}}/>
                                <div>
                                    <Link to='/create'>
                                        <h4 
                                            // className="link-2"
                                            style={{
                                                padding: "10px 20px"
                                            }}
                                        >
                                            Create
                                        </h4>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                :
                null
            }
            
            <h4 style={{
                    color: "black", 
                    fontStyle: "italic"
                }}
            >
                PRNTS
            </h4>
            
            <NavLink 
                exact
                to='/' 
                activeClassName="selected"
            >
                <MobileNavbar.Item className="lnk">Home</MobileNavbar.Item>
            </NavLink>
            <NavLink 
                exact
                to='/music' 
                activeClassName="selected"
            >
                <MobileNavbar.Item className="lnk">Music & More</MobileNavbar.Item>
            </NavLink>
            <NavLink 
                exact
                to='/artists' 
                activeClassName="selected"
            >
                <MobileNavbar.Item className="lnk">Artists</MobileNavbar.Item>
            </NavLink>
            {/* {
                account === null
                ?
                <ConnectWallet isMobile={isMobile} account={account} />
                :
                null
            }
             */}
            
            
        </MobileNavbar.Items>
        </MobileNavbar.Wrapper>
        )
        : 
        (
        <div>
        <Navbar.Wrapper className="header">
        <NavLink exact to='/'>
            <Navbar.Logo>PRNTS</Navbar.Logo>
        </NavLink>
        
        <Navbar.Items className="nav-links">
          {/* <Navbar.Item className="link-1">
            <NavLink 
                exact
                to='/' 
                activeClassName="selected"
            > Home </NavLink>
          </Navbar.Item>
          <Navbar.Item className="link-1">Music</Navbar.Item>
          <Navbar.Item className="link-1">Artists</Navbar.Item> */}
            <NavLink 
                exact
                to='/' 
                activeClassName="selected"
            >
                <h3 className="link-1">Home</h3>
            </NavLink>
            <NavLink 
                exact
                to='/music'
                activeClassName="selected"
            >
                <h3 className="link-1">Music & More</h3>
            </NavLink>   
            <NavLink 
                exact
                to='/artists'
                activeClassName="selected"
            >
                <h3 className="link-1">Artists</h3>
            </NavLink>
                
        </Navbar.Items>
        
        </Navbar.Wrapper>
        <div style={{margin: "0px 0px 20px 10px", right: "10px", position: "relative"}}>
            { 
                account === "" || typeof account === "undefined"
                ?
                // <button className="btn" id="connect wallet">Connect Wallet</button> 
                // <ConnectWallet isMobile={isMobile} account={account} />
                null
                : 
                <div className="profile-links">
                    <div onClick={refreshPage}>
                        <Link to={`/artists/${account}`}><h4 className="link-2" >Profile</h4></Link> 
                    </div>
                    <div>
                        <Link to='/create'><h4 className="link-2">+Create</h4></Link>
                    </div>
                    {/* <ConnectWallet isMobile={isMobile} account={account} /> */}
                </div>
            }
            
            {/* <div className="profile-links">
                <div onClick={refreshPage}>
                    <Link to={`/artists/${account}`}><h4 className="link-2" >Profile</h4></Link> 
                </div>
                <div>
                    <Link to='/create'><h4 className="link-2">+Create</h4></Link>
                </div>
            </div>
            <ConnectWallet isMobile={isMobile} account={account} /> */}
        </div>
        </div>
        )
        
        // (<header className='header'>
        //     {/* <h3 style={headingStyle}>{props.title}</h3> */}
        //     <Link to='/'>
        //         {/* <img style={{zoom: "15%"}} src={logo} alt="" /> */}
        //         <h1 style={logoStyle}><i>PRNTS</i></h1>
        //     </Link>
            
        //     <div className='nav-links'>
                // <NavLink 
                //     exact
                //     to='/' 
                //     activeClassName="selected"
                // >
                //     <h3 className="link-1">Home</h3>
                // </NavLink>
                // <NavLink 
                //     exact
                //     to='/music'
                //     activeClassName="selected"
                // >
                //     <h3 className="link-1">Music</h3>
                // </NavLink>   
                // <NavLink 
                //     exact
                //     to='/artists'
                //     activeClassName="selected"
                // >
                    
                //     <h3 className="link-1">Artists</h3>
                // </NavLink>
        //     </div>
            // <div>
            // { 
            //     showConnect 
            //     ?
            //     <button className="btn" id="connect wallet">Connect Wallet</button> 
            //     : 
            //     <div className="profile-links">
            //         <div onClick={refreshPage}>
            //             <Link to={`/artists/${account}`}><h4 className="link-2" >Profile</h4></Link> 
            //         </div>
            //         <div>
            //             <Link to='/create'><h4 className="link-2">+Create</h4></Link>
            //         </div>
            //     </div>
            // }
            // </div>
        // </header>)
        }
        </div>
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