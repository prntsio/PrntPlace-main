import React from 'react';
import { Link } from 'react-router-dom';
import introImg from '../../assets/images/Intro-image2.jpg';

const Body = () => {
    return (
        <div className="intro">
            <div className="intro-img">
                <img src={introImg} alt="" />
            </div>
            <div className="intro-content">
                <h1 style={{ padding: '10px 0px 20px 0px' }}>
                    Imagine music as NFTS{' '}
                </h1>
                <Link to="/music">
                    <button className="btn">
                        <h3>Explore Music</h3>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Body;
