import React from 'react'

const Profile = ({name, username, ethAddress, Id}) => {
    const address = ethAddress.slice(0,6)+"....."+ethAddress.slice(-7);

    return (
        <div>
            <div className="profile-desc">
                <div className="pic-1">
                    
                </div>
                <div className="details-1">
                    <div>
                        <h1>{name}</h1>
                    </div>
                    <div>
                        <h3>@{username}</h3>
                    </div>
                    <div className="eth-address">
                        <div className="artist-id">#{Id}</div>
                        <div className="address">{address}</div>
                        <div className="copy-symbol">Copy</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Profile.defaultProps = {
    name: "Jack Butcher",
    username: "anonymus",
    ethAddress: "0x09a9601349928e391fB12BAb0270999d189072EE",
    Id: "11582"
}

export default Profile
