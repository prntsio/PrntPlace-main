import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import web3 from '../../ethereum/web3';
import Artwork from '../Artworks/Card/Card';
import PrntNFTFactory from '../../ethereum/PrntNFTFactory';
import PrntNFTData from '../../ethereum/PrntNFTData';
// import PrntNFTData from '../../ethereum/PrntNFTData';

const Creations = () => {
    const { id } = useParams();

    const [listCreations, setlistCreations] = useState([]);

    const refresh = async () => {
        window.location.reload();
    };

    const getCreations = async () => {
        const creations = await PrntNFTFactory.methods.getCreations(id).call();
        // console.log(creations);
        let promises = creations.map((prnt) => {
            // await getPrnt(address);
            // console.log(prnt);
            return fetch(prnt.tokenUri).then((res) => {
                let tokenURI;
                return res.json().then(async (res) => {
                    tokenURI = res;

                    const { prntPrice, status } = await PrntNFTData.methods
                        .tokensByAddress(prnt.prntNFT, 1) // display price of 1st edition
                        .call();

                    const ownerArray = await PrntNFTData.methods
                        .getOwnerOfToken(prnt.prntNFT, 1)
                        .call();
                    const creator = ownerArray[0];
                    // console.log(creator);
                    return (
                        <div key={prnt[0]} onClick={refresh}>
                            <Link to={`/music/${prnt[0]}/1`}>
                                <Artwork
                                    title={`# ${tokenURI.name} - ${tokenURI.symbol}`}
                                    username={`${creator.slice(
                                        0,
                                        6
                                    )}....${creator.slice(-7, -1)}`}
                                    price={`${web3.utils.fromWei(
                                        prntPrice,
                                        'ether'
                                    )} ETH`}
                                    imageUrl={`https://ipfs.io/ipfs/${tokenURI.imageHash}`}
                                    editions={tokenURI.attributes[0].value}
                                />
                            </Link>
                        </div>
                    );
                });
            });
        });

        Promise.all(promises).then((listCreations) => {
            listCreations.reverse();
            setlistCreations(listCreations);
        });
        // console.log(listCreations);
    };

    useEffect(() => {
        getCreations();
    }, []);

    return (
        <div className="grid-style">
            {/* <Artwork title="# Pop Music" username="visualzz" price="0.8ETH" /> */}
            {listCreations}
        </div>
    );
};

export default Creations;
