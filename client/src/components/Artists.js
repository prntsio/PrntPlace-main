import React, {useState, useEffect} from 'react'
import "../css/Artist.css";
import Card from '../components/Artist/Card';
import {Link} from 'react-router-dom'
import PrntNFTData from '../ethereum/PrntNFTData';

const Artists = () => {
    const [listArtists, setlistArtists] = useState([])

    const getAllArtists = async () => {
        const artists = await PrntNFTData.methods.getAllArtists().call();
        const listArtists = artists.map((address) => {
            return (
                <div key={address} >
                    <Link to={`/artists/${address}`} >
                        <Card 
                            ethAddress={address}
                        />
                    </Link>

                </div>
            );
        });
        // listArtists.reverse();
        setlistArtists(listArtists);
    }

    useEffect(() => {
        getAllArtists();
        return () => {
            // cleanup
        }
    }, [])

    return (
        <div className="grid-container">
            {/* <h2>Artists</h2> */}
            {listArtists}
        </div>
    )
}

export default Artists
