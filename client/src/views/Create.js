import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import '../components/Create/Create.css';
import web3 from '../ethereum/web3';
import PrntNFTFactory from '../ethereum/PrntNFTFactory';
import PreviewCard from '../components/Artworks/Card/Card';
// import { isMobile } from 'web3modal';

const axios = require('axios');
const FormData = require('form-data');

const Create = ({ account, isMobile }) => {
    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

    const [name, setname] = useState('');
    const [symbol, setsymbol] = useState('');
    const [description, setdescription] = useState('');
    const [royalties, setRoyalties] = useState('');
    const [editions, setEditions] = useState('');
    const [price, setprice] = useState('');
    // const [ipfsHash, setipfsHash] = useState(null);
    const [videoHash, setVideoHash] = useState(null);
    const [imageHash, setImageHash] = useState(null);
    // const [accounts, setaccounts] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [videoUpload, setvideoUpload] = useState(false);
    const [imageUpload, setimageUpload] = useState(false);
    const [selectedVideo, setselectedVideo] = useState(null);
    const [selectedImage, setselectedImage] = useState(null);

    let history = useHistory();

    const pinVideoToIPFS = async (e) => {
        e.preventDefault();
        setvideoUpload(true);
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        const data = new FormData();
        data.append('file', selectedVideo);
        // alert("pinning to pinata")
        try {
            // const accounts = await web3.eth.getAccounts();
            // setaccounts(accounts);
            const res = await axios.post(url, data, {
                maxContentLength: 'Infinity',
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });
            setVideoHash(res.data.IpfsHash);
            // alert(res.data.IpfsHash)
            setvideoUpload(false);
            console.log(res.data);
        } catch (err) {
            console.log(err);
            setvideoUpload(false);
        }
    };

    const pinImageToIPFS = async (e) => {
        e.preventDefault();
        setimageUpload(true);
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        const data = new FormData();
        data.append('file', selectedImage);
        // alert("pinning to pinata")
        try {
            // const accounts = await web3.eth.getAccounts();
            // setaccounts(accounts);
            const res = await axios.post(url, data, {
                maxContentLength: 'Infinity',
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });
            setImageHash(res.data.IpfsHash);
            // alert(res.data.IpfsHash)
            setimageUpload(false);
            console.log(res.data);
        } catch (err) {
            console.log(err);
            setimageUpload(false);
        }
    };

    const metadata = {
        pinataMetadata: {
            name: `${name}.json`,
        },
        pinataContent: {
            name: name,
            symbol: symbol,
            description: description,
            // no_of_editions: editions,
            // category: category,
            image: `https://ipfs.io/ipfs/${videoHash}`,
            imageHash: imageHash,
            // external_url: `http://prnts.netlify.app/music`,
            background_color: 'b2d8d8',
            attributes: [
                {
                    display_type: 'number',
                    trait_type: 'Total Editions',
                    value: editions,
                },
            ],
        },
    };

    // const {name, symbol, description, category, imageHash, videoHash} = metadata.pinataContent;

    const onCreateNewNFT = async (event) => {
        event.preventDefault();
        setLoading(true);

        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

        try {
            const res = await axios.post(url, metadata, {
                maxContentLength: 'Infinity',
                // __filename: `${metadata.name}.json`,
                headers: {
                    // 'Content-Type': `application/json; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });

            // if (!res.success) {
            //     return {
            //         success: false,
            //         status:
            //             '😢 Something went wrong while uploading your tokenURI.',
            //     };
            // }

            console.log(res.data);
            const tokenURI = res.data.IpfsHash;

            // contract will have name, symbol, tokenUri - ERC721 constructor(name, symbol)
            await PrntNFTFactory.methods
                .createNewPrntNFT(
                    name,
                    symbol,
                    tokenURI,
                    web3.utils.toWei(price, 'ether'),
                    editions,
                    royalties
                )
                .send({
                    from: account,
                });

            // await PrntNFTFactory.methods
            //     .createNewPrntNFT(
            //         name,
            //         symbol,
            //         web3.utils.toWei(price, 'ether'),
            //         videoHash,
            //         imageHash
            //     )
            //     .send({
            //         from: account,
            //     });
            setLoading(false);
            // // alert("NFT minted successfully!")
            // return <Redirect to="/music" />;
            history.push('/music');
            // window.location.reload();
        } catch (err) {
            console.log(err);
            setLoading(false);
            // return <Redirect to="/music" />;
            // history.push('/music');

            alert('Enter values correctly.', err);
        }
    };

    return (
        <div className="create-nfts-container">
            <div className="form-title">
                <h3>Create NFTs</h3>
            </div>
            <div className="fields">
                <div className="upload-field">
                    <div className="upload-box">
                        {/* <h2 style={{ margin: '10px 50px 10px 50px' }}>Create NFTS</h2> */}
                        <div className="uploads">
                            {!videoHash ? (
                                <div
                                    className={
                                        isMobile
                                            ? 'upload-file mobile'
                                            : 'upload-file'
                                    }
                                >
                                    <div className="upload-text">
                                        <h3>Upload Video</h3>
                                    </div>
                                    <div className="choose-file">
                                        <form onSubmit={pinVideoToIPFS}>
                                            {/* <input type="file" accept="image/*" onChange={captureFile} /> */}
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                accept="video/mp4,video/x-m4v,video/*"
                                                // value={selectedFile || ''}
                                                onChange={(e) =>
                                                    setselectedVideo(
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                            <button
                                                type="submit"
                                                className="btn"
                                            >
                                                {!videoUpload && (
                                                    <h4>Upload Video</h4>
                                                )}
                                                {videoUpload && (
                                                    <ReactLoading
                                                        type={'bubbles'}
                                                        height={30}
                                                        width={30}
                                                    />
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={
                                        isMobile
                                            ? 'upload-file mobile'
                                            : 'upload-file'
                                    }
                                >
                                    <h2 style={{ color: '#a3d0d2db' }}>
                                        Video Uploaded!
                                    </h2>
                                    <span>{selectedVideo.name}</span>
                                    {/* <h4 style={{marginTop: "40px"}}>Please enter rest details...</h4> */}
                                </div>
                            )}
                            {!imageHash ? (
                                <div
                                    className={
                                        isMobile
                                            ? 'upload-file mobile'
                                            : 'upload-file'
                                    }
                                >
                                    <div className="upload-text">
                                        <h3>Upload Thumbnail</h3>
                                        <p>
                                            We recommend image size to be 282px
                                            x 260px.
                                        </p>
                                    </div>
                                    <div className="choose-file">
                                        <form onSubmit={pinImageToIPFS}>
                                            {/* <input type="file" accept="image/*" onChange={captureFile} /> */}
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                accept="image/*"
                                                // value={selectedFile || ''}
                                                onChange={(e) =>
                                                    setselectedImage(
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                            <button
                                                type="submit"
                                                className="btn"
                                            >
                                                {!imageUpload && (
                                                    <h4>Upload Cover</h4>
                                                )}
                                                {imageUpload && (
                                                    <ReactLoading
                                                        type={'bubbles'}
                                                        height={30}
                                                        width={30}
                                                    />
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={
                                        isMobile
                                            ? 'upload-file mobile'
                                            : 'upload-file'
                                    }
                                >
                                    <h2 style={{ color: '#a3d0d2db' }}>
                                        Cover Uploaded!
                                    </h2>
                                    <span>{selectedImage.name}</span>
                                    {/* <h4 style={{marginTop: "40px"}}>Please enter rest details...</h4> */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="preview-detail-field">
                    <div className="preview-field">
                        <PreviewCard
                            title={`# ${name} - ${symbol}`}
                            username={`${account.slice(
                                0,
                                6
                            )}....${account.slice(-7, -1)}`}
                            price={`${price} ETH`}
                            imageUrl={`https://ipfs.io/ipfs/${imageHash}`}
                            editions={editions}
                        />
                    </div>
                    <div className="detail-field">
                        <div className="nft-name">
                            <input
                                type="text"
                                className="user-input"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                        <div className="nft-symbol">
                            <input
                                type="text"
                                className="user-input"
                                placeholder="Symbol"
                                value={symbol}
                                onChange={(e) => setsymbol(e.target.value)}
                            />
                        </div>
                        <div className="nft-description">
                            <input
                                type="text"
                                className="user-input"
                                placeholder="Description (optional)"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                            />
                        </div>
                        <div className="inputs-same-line">
                            <div className="nft-editions">
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    max="10"
                                    // name=""
                                    className="user-input small"
                                    placeholder="Editions"
                                    title="No. of Editions (Integers only, Maximum 10 allowed)"
                                    value={editions}
                                    onChange={(e) =>
                                        setEditions(e.target.value)
                                    }
                                />
                            </div>
                            <div className="nft-royalties">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    title="Recommended ( 10% )"
                                    className="user-input small"
                                    placeholder="Royalties in %"
                                    value={`${royalties}`}
                                    onChange={(e) =>
                                        setRoyalties(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="nft-price">
                            <input
                                type="number"
                                min="0"
                                step="0.0000000001"
                                required
                                className="user-input"
                                placeholder="Price in ETH"
                                title="Allowed till 10 decimal places, i.e min. 10^8 wei"
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '10px 0px',
                            }}
                        >
                            <p style={{ fontFamily: 'cursive' }}>
                                {`Marketplace fees: 
                                1st sale - 10%,
                                others - 3%`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="btn"
                style={{
                    marginTop: '20px',
                }}
                onClick={onCreateNewNFT}
                disabled={Loading}
            >
                {Loading && (
                    <ReactLoading type={'bubbles'} height={30} width={30} />
                )}
                {!Loading && <h4>Create</h4>}
            </button>
        </div>
    );
};

export default Create;
