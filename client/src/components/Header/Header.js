import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
// import MetaMaskOnboarding from '@metamask/onboarding'
// import web3 from '../ethereum/web3';
import styled from 'styled-components';
import './Dropdown.css';
import prntsLogo from '../../assets/images/prnts-logo.png';

const Header = ({ account, isMobile }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const refreshPage = async () => {
        window.location.reload();
    };

    const Navbar = {
        Wrapper: styled.nav`
            width: inherit;
            height: 120px;
            padding: 10px 10px 10px 30px;
            display: flex;
            color: white;
            align-items: center;
            justify-content: space-around;
        `,
        Logo: styled.div`
            // padding: 1.5rem 1rem;
            // padding: 15px 0px;
            color: black;
            margin-top: -25px;
            padding: 10px 0px;
            // margin-bottom: 10vh;
            // top: 2vh;
            // position: absolute;
        `,
        Items: styled.ul`
            top: 70px;
            position: absolute;
            width: 80%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;
            list-style: none;
            // box-shadow: 5px 5px 12px #e0e5e6,
            //           -5px -5px 12px #f2f9fa;
            // padding: 10px 10px;
            // border-radius: 50px;
            padding: 20px 0px;
        `,
        Item: styled.li`
            //   padding: 0 1rem;
            //   cursor: pointer;
            padding: 12px 24px;
            color: black;
            font-weight: bolder;
            border-radius: 24px;
            background: rgb(233 239 240);
            box-shadow: 5px 5px 13px #e6e6e6, -5px -5px 13px #f4f4f4;
        `,
    };

    const MobileNavbar = {
        Wrapper: styled(Navbar.Wrapper)`
            width: 100vw;
            background: rgb(233 239 240);
            justify-content: center;
            padding: 10px 10px;
            // margin-top: 8vh;
            position: sticky;
            position: -webkit-sticky;
            top: 0;
            z-index: 1;
        `,
        Logo: styled(Navbar.Logo)`
            // padding: 0.5rem 1rem;
            padding: 10px 0px;
            margin-top: -50px;
            // color: black;
            font-size: 18px;
            // font-style: italic;
            // margin-top: 0px;
        `,
        Items: styled(Navbar.Items)`
            flex: 1;
            padding: 0 0.3rem;
            // padding: 30px 0px;
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
                isMobile ? (
                    <MobileNavbar.Wrapper>
                        <NavLink exact to="/">
                            <MobileNavbar.Logo>
                                <img
                                    src={prntsLogo}
                                    style={{
                                        height: '35px',
                                        width: 'auto',
                                    }}
                                />
                            </MobileNavbar.Logo>
                        </NavLink>

                        <MobileNavbar.Items className="nav-links">
                            {!(
                                account === '' || typeof account === 'undefined'
                            ) ? (
                                <div
                                    className="dropdown"
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                >
                                    <FaBars color="black" className="dropbtn" />
                                    <div
                                        className="dropdown-content"
                                        style={{
                                            display: dropdownOpen
                                                ? 'grid'
                                                : 'none',
                                        }}
                                    >
                                        <div>
                                            <div onClick={refreshPage}>
                                                <Link
                                                    to={`/artists/${account}`}
                                                >
                                                    <h4
                                                        // className="link-2"
                                                        style={{
                                                            padding:
                                                                '10px 20px',
                                                        }}
                                                    >
                                                        Profile
                                                    </h4>
                                                </Link>
                                            </div>
                                            {/* <hr style={{ margin: '0px 10px 0px 10px' }} /> */}
                                            <div>
                                                <Link to="/create">
                                                    <h4
                                                        // className="link-2"
                                                        style={{
                                                            padding:
                                                                '10px 20px',
                                                        }}
                                                    >
                                                        Create
                                                    </h4>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* <h4
                style={{
                  color: 'black',
                  fontStyle: 'italic',
                }}
              >
                PRNTS
              </h4> */}

                            <NavLink exact to="/" activeClassName="selected">
                                <MobileNavbar.Item className="lnk">
                                    Home
                                </MobileNavbar.Item>
                            </NavLink>
                            <NavLink
                                exact
                                to="/music"
                                activeClassName="selected"
                            >
                                <MobileNavbar.Item className="lnk">
                                    Music & More
                                </MobileNavbar.Item>
                            </NavLink>
                            <NavLink
                                exact
                                to="/artists"
                                activeClassName="selected"
                            >
                                <MobileNavbar.Item className="lnk">
                                    Artists
                                </MobileNavbar.Item>
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
                ) : (
                    <div>
                        <Navbar.Wrapper className="header">
                            <NavLink exact to="/">
                                <Navbar.Logo className="prnts-logo">
                                    <img
                                        src={prntsLogo}
                                        style={{
                                            height: '45px',
                                            width: 'auto',
                                        }}
                                    />
                                </Navbar.Logo>
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
                                    to="/"
                                    activeClassName="selected"
                                >
                                    <h3 className="link-1">Home</h3>
                                </NavLink>
                                <NavLink
                                    exact
                                    to="/music"
                                    activeClassName="selected"
                                >
                                    <h3 className="link-1">Music & More</h3>
                                </NavLink>
                                <NavLink
                                    exact
                                    to="/artists"
                                    activeClassName="selected"
                                >
                                    <h3 className="link-1">Artists</h3>
                                </NavLink>
                            </Navbar.Items>
                        </Navbar.Wrapper>
                        <div
                            style={{
                                margin: '0px 0px 20px 10px',
                                right: '10px',
                                position: 'relative',
                            }}
                        >
                            {account === '' ||
                            typeof account === 'undefined' ? null : ( // <ConnectWallet isMobile={isMobile} account={account} /> // <button className="btn" id="connect wallet">Connect Wallet</button>
                                <div className="profile-links">
                                    <div onClick={refreshPage}>
                                        <Link to={`/artists/${account}`}>
                                            <h4 className="link-2">Profile</h4>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/create">
                                            <h4 className="link-2">+Create</h4>
                                        </Link>
                                    </div>
                                    {/* <ConnectWallet isMobile={isMobile} account={account} /> */}
                                </div>
                            )}

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
};

Header.defaultProps = {
    title: 'Music Nfts',
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

// const logoStyle = {
//     color: 'black',
//     letterSpacing: -2
// }

export default Header;
