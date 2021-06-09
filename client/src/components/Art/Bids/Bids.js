import React from 'react';
import { Link } from 'react-router-dom';

import './Bids.css';

const Bids = ({ title, by, address }) => {
    return (
        <div className="bid-1">
            <div className="bid-by">
                <h3>{title}</h3>
            </div>
            <div className="gap-val" />
            <div className="bid-val">
                <Link to={`/artists/${address}`}>
                    <p>{by}</p>
                </Link>
            </div>
        </div>
    );
};

export default Bids;
