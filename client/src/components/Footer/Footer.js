import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaDiscord, FaInstagram, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="social">
                {/* <a target="_blank" href="www.twitter.com"><h4>Twitter</h4></a> */}
                <Link to={{ pathname: 'https://twitter.com' }} target="_blank">
                    <FaTwitter size={38} className="footer-logo" />
                </Link>
                <Link to={{ pathname: 'https://discord.com' }} target="_blank">
                    <FaDiscord size={38} className="footer-logo" />
                </Link>
                <Link
                    to={{ pathname: 'https://instagram.com' }}
                    target="_blank"
                >
                    <FaInstagram size={38} className="footer-logo" />
                </Link>
                <Link to={{ pathname: 'https://github.com' }} target="_blank">
                    <FaGithub size={38} className="footer-logo" />
                </Link>
            </div>
            <div className="terms">
                <div className="terms-right">
                    <Link to="">
                        <h4>Terms of Service</h4>
                    </Link>
                    <Link to="">
                        <h4>Privacy</h4>
                    </Link>
                    <Link to="">
                        <h4>Help</h4>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
