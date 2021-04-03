import React from 'react';
import introImg from "../img/Intro-image.jpg";

const Body = () => {
    return (
        <div className="intro">
            <div className="intro-img">
                <img src={introImg} alt='' />
            </div>
            <div className="intro-content">
                <h1 style={{padding: "10px 20px 20px 0px"}}>Imagine music as NFTS </h1>
                <button className='btn'>Explore Music</button>
            </div>
            
        </div>
    )
}

export default Body