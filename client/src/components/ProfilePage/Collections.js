import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import web3 from '../../ethereum/web3';
import Artwork from '../Artworks/Card/Card';
import PrntNFTMarketplace from '../../ethereum/PrntNFTMarketplace';
import PrntNFTData from '../../ethereum/PrntNFTData';

const Collections = () => {
    const { id } = useParams();

    const [listCollections, setlistCollections] = useState([]);

    const refresh = async () => {
        window.location.reload();
    };

    const getCollections = async () => {
        const collections = await PrntNFTMarketplace.methods
            .getCollections(id)
            .call();
        // const _prnt = await PrntNFTData.methods.getPrntByNFTAddress()
        // console.log(collections);
        const promises = collections.map((prnt) => {
            // const len = prnt[3].length;
            return fetch(prnt.tokenUri)
                .then((res) => {
                    return res
                        .json()
                        .then(async (res) => {
                            let tokenURI = res;
                            // console.log(tokenURI);

                            const ownerArray = await PrntNFTData.methods
                                .getOwnerOfToken(prnt[0], 1)
                                .call();
                            const creator = ownerArray[0];
                            const { prntPrice, status } =
                                await PrntNFTData.methods
                                    .tokensByAddress(prnt[0], 1)
                                    .call();
                            const len = ownerArray.length;

                            return (
                                <div key={prnt[0]} onClick={refresh}>
                                    {ownerArray[len - 1] !== id ? ( //here it will be always true sadly :(
                                        <p
                                            style={{
                                                color: 'red',
                                                margin: '10px 0px',
                                            }}
                                        >
                                            **Previously Owned
                                        </p>
                                    ) : null}
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
                                            editions={
                                                tokenURI.attributes[0].value
                                            }
                                        />
                                    </Link>
                                </div>
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
            // console.log(prnt[3]);
        });

        Promise.all(promises).then((listCollections) => {
            listCollections.reverse();
            setlistCollections(listCollections);
        });
    };

    useEffect(() => {
        getCollections();
    }, []);

    return <div className="grid-style">{listCollections}</div>;
};

export default Collections;
