import React from 'react'
import Body from './Body';
import Artworks from '../components/Artworks';
import "../css/Home.css";

const Home = () => {
    return (
        <div>
            <Body />
            <hr
                style={{
                    color: 'grey',
                    height: "20",
                    margin: "10px 30px"
                }}
            />
            <h1 style={{margin: "20px 39px"}}>Featured</h1>
            <Artworks />

        </div>
    )
}

export default Home
