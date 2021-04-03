import React from 'react'
import "../css/Bids.css";

const Bids = ({title,by}) => {
    return (
        <div className="bid-1">
            <div className="bid-by">
                <h3>{title}</h3>
                <p>{by}</p>
            </div>
            <div className="bid-val">
                <h3>0.8 ETH</h3>
            </div>
            
        </div>
    )
}

export default Bids
