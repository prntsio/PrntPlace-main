import React from 'react'
import "../css/Artist.css";
import Card from '../components/Artist/Card';
import {Link} from 'react-router-dom'

const Artists = () => {
    return (
        <div className="grid-container">
            {/* <h2>Artists</h2> */}
            <Link to={`/artists/{username}`}>
                <Card />
            </Link>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}

export default Artists
