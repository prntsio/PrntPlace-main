import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ id, isMobile }) => {
    return (
        <div className="nav">
            <div className="nav-lnk">
                <NavLink exact to={`/artists/${id}`} activeClassName="selected">
                    {isMobile ? (
                        <h4 className="link-cc">Creations</h4>
                    ) : (
                        <h3 className="link-cc">Creations</h3>
                    )}
                </NavLink>
            </div>
            <div className="nav-lnk">
                <NavLink
                    exact
                    to={`/artists/${id}/collections`}
                    activeClassName="selected"
                >
                    {isMobile ? (
                        <h4 className="link-cc">Collections</h4>
                    ) : (
                        <h3 className="link-cc">Collections</h3>
                    )}
                </NavLink>
            </div>
        </div>
    );
};

export default Nav;
