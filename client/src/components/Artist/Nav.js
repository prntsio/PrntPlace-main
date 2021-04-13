import React from 'react'
import {NavLink} from 'react-router-dom';

const Nav = ({id}) => {
    return (
        <div className="nav">
            <div className="nav-lnk">
                <NavLink 
                    exact
                    to={`/artists/${id}`} 
                    activeClassName="selected"
                >
                    <h3 className="link-cc">Creations</h3>
                </NavLink>
            </div>
            <div className="nav-lnk">
                <NavLink 
                    exact
                    to={`/artists/${id}/collections`}
                    activeClassName="selected"
                >
                    <h3 className="link-cc">Collections</h3>
                </NavLink>
            </div>
        </div>
    )
}

export default Nav
