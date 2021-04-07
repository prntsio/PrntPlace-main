import React from 'react'
import '../css/Card.css'
// import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

const Card = ({imageUrl, title, price, username}) => {
    return (
        <div className='card-container'>
            <div className='img-container'>
                <img src={imageUrl} alt='' />
            </div>
            <div className='card-title'>
                <b>{title}</b>
                <div className="creator">
                    <i>Artist: </i>
                    {/* <Link to='/artists/{username}'> */}
                        <h4 className="artist-link">@ {username}</h4>
                    {/* </Link> */}
                </div>
            </div>
            <div className='card-body'>
                <b style={{margin: "10px"}}>Worth: {price}</b>
                {/* <button className='btn'>Buy</button>
                <button className='btn'>Sell</button> */}
            </div>
        </div>
    )
}

Card.defaultProps = {
    title: "#Bad Trip",
    price: "1ETH",
    username: "anonymus"
}

Card.propTypes = {
    title: PropTypes.string,
    price: PropTypes.string.isRequired,
    username: PropTypes.string
}

export default Card
