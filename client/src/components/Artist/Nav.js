import React from 'react'
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <div className="nav">
            <div className="nav-lnk">
                <Link to='/artists/{username}' >
                    <h3>Creations</h3>
                </Link>
            </div>
            <div className="nav-lnk">
                <Link to='/artists/{username}/collections'>
                    <h3>Collections</h3>
                </Link>
            </div>
        </div>
    )
}

export default Nav
