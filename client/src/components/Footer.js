import React from 'react'
import {Link} from 'react-router-dom';
import "../css/Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="social">
                <Link to=""><h4>Twitter</h4></Link>
                <Link to=""><h4>Discord</h4></Link>
                <Link to=""><h4>Instagram</h4></Link>
            </div>
            <div className="terms">
                <div className="terms-right">
                    <Link to=""><h4>Terms of Service</h4></Link>
                    <Link to=""><h4>Privacy</h4></Link>
                    <Link to=""><h4>Help</h4></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
