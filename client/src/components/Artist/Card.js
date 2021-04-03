import React from 'react'

const Card = ({imageUrl, description, name, ethaddress}) => {
    const address = ethaddress.slice(0,7) + "...." + ethaddress.slice(-7);
    return (
        <div className='artist-card-container'>
            <div className='artist-img-container'>
                <img src={imageUrl} alt='' />
            </div>
            <div className='artist-title'>
                <b style={{fontSize: "23px"}}>{name}</b>
            </div>
            <div className="user">
                {/* <h4 className="user-name"> @{username} anonymus</h4> */}
                <h4 className="user-name"> @{address}</h4>
            </div>
            <div className='desc'>
                {description} Music Artist. Rapper.
            </div>
        </div>
    )
}

Card.defaultProps = {
    ethaddress: "0x6c0085E600398247a37de389931CCea8EdD3ba67"
}

export default Card
