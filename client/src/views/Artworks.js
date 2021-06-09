import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Artworks/Card/Card';
// import web3 from '../ethereum/web3';
// import PrntNFT from '../ethereum/PrntNFT';
import web3 from '../ethereum/web3';
import PrntNFTData from '../ethereum/PrntNFTData';

const Artworks = () => {
    const [listItems, setlistItems] = useState(null);

    const listArtworks = async () => {
        const list = await PrntNFTData.methods.getAllPrnts().call();
        // console.log(list);
        let promises = list.map((items) => {
            return fetch(items.tokenUri)
                .then((res) => {
                    // tokenURI = res;
                    // console.log(res);
                    let tokenURI;
                    // = {
                    //     name: '',
                    //     symbol: '',
                    //     description: '',
                    //     no_of_editions: '',
                    //     imageHash: '',
                    //     videoHash: '',
                    // };
                    // let json;
                    return res
                        .json()
                        .then(async (resp) => {
                            tokenURI = resp;
                            // console.log('tokenUri', tokenURI);

                            const { prntPrice, status } =
                                await PrntNFTData.methods
                                    .tokensByAddress(items[0], 1) // display price of 1st edition
                                    .call();
                            // console.log(
                            //     'price:',
                            //     prntPrice,
                            //     '-------- status:',
                            //     status
                            // );
                            const ownerArray = await PrntNFTData.methods
                                .getOwnerOfToken(items[0], 1)
                                .call();
                            const creator = ownerArray[0];
                            // console.log(creator);

                            // return PrntNFTData.methods
                            //     .getOwnerOfToken(items[0], 1) // need creator address
                            //     .call()
                            //     .then((res) => {
                            //         console.log(res);

                            //     })
                            //     .catch((err) => {
                            //         console.log(err);
                            //         alert('Something went wrong.');
                            //     });
                            return (
                                <div key={items[0]}>
                                    <Link to={`/music/${items[0]}/1`}>
                                        <Card
                                            title={`# ${tokenURI.name} - ${tokenURI.symbol}`}
                                            // username={`${creator.slice(
                                            //     0,
                                            //     6
                                            // )}....${creator.slice(
                                            //     -7,
                                            //     -1
                                            // )}`}
                                            username={creator}
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
                        .catch((err) => console.log(err));
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        Promise.all(promises).then((listitems) => {
            listitems.reverse();
            setlistItems(listitems);
        });
    };

    useEffect(() => {
        listArtworks();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            style={{
                padding: '30px 0px',
                // margin: "100px"
            }}
        >
            <div className="grid-style">{listItems}</div>
        </div>
    );
};

export default Artworks;
