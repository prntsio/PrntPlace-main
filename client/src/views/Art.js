import React, { useState, useEffect } from 'react';
// import { ReactVideo, ReactAudio, YoutubePlayer } from "reactjs-media";
import ReactPlayer from 'react-player';
import '../components/Art/Art.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Bids from '../components/Art/Bids/Bids';
import web3 from '../ethereum/web3';
import PrntNFTData from '../ethereum/PrntNFTData';
import PrntNFTMarketplace from '../ethereum/PrntNFTMarketplace';
import PrntNFT from '../ethereum/build/PrntNFT.json';
import PrntNFTFactory from '../ethereum/PrntNFTFactory';

import Modal from '../components/Art/ApproveModal/ApproveModal';
import useModal from '../hooks/useModal';

const Art = ({ account }) => {
    const { id, tokenId } = useParams();

    let history = useHistory();

    const { isShowing, toggle } = useModal();

    const [prnt, setprnt] = useState(['', '', '']);
    const [totalOwners, settotalOwners] = useState(1);
    // const [account, setaccount] = useState(null)
    // const [Account, setAccount] = useState("")
    const [status, setstatus] = useState('');
    const [PRNT_NFT_MARKETPLACE, setPRNT_NFT_MARKETPLACE] = useState('');
    const [listBids, setlistBids] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [instance, setInstance] = useState();
    const [isApproved, setIsApproved] = useState(false);
    const [ownerArray, setOwnerArray] = useState(['']);
    const [prntPrice, setprntPrice] = useState('0');
    const [tokenURI, settokenURI] = useState({ attributes: [{ value: 1 }] });
    const [edition, setEdition] = useState(tokenId);
    const [listEditions, setListEditions] = useState(null);

    //bytes32 for "Open"
    const open =
        '0x4f70656e00000000000000000000000000000000000000000000000000000000';
    //bytes32 from "Cancelled"
    // const cancelled = "0x43616e63656c6c65640000000000000000000000000000000000000000000000"

    // console.log(id);
    const getPrnt = async () => {
        try {
            // const accounts = await web3.eth.getAccounts();
            // console.log(accounts[0])
            // setaccount(accounts[0])
            // setaccount(accounts[0])
            console.log('account:', account);
            const prnt = await PrntNFTData.methods
                .getPrntByNFTAddress(id)
                .call();
            const tokenUri = prnt.tokenUri;
            const tokenURI = await (await fetch(tokenUri)).json();
            settokenURI(tokenURI);
            console.log('tokenUri', tokenURI);
            const { prntPrice, status } = await PrntNFTData.methods
                .tokensByAddress(id, tokenId)
                .call();
            // console.log(prntPrice);
            setprntPrice(prntPrice);
            const ownerArray = await PrntNFTData.methods
                .getOwnerOfToken(id, tokenId)
                .call();
            console.log(ownerArray);
            const totalOwners = ownerArray.length;
            setOwnerArray(ownerArray);
            settotalOwners(totalOwners);
            const trade = await PrntNFTMarketplace.methods
                .getTrade(id, tokenId)
                .call();
            const PRNT_NFT_MARKETPLACE = await PrntNFTFactory.methods
                .prntNFTMarketplace()
                .call();
            setPRNT_NFT_MARKETPLACE(PRNT_NFT_MARKETPLACE);
            setstatus(trade.status);
            const instance = new web3.eth.Contract(
                PrntNFT.abi,
                id //PrntNFT address
            );
            setInstance(instance);
            console.log(prnt);

            setprnt(prnt);

            if (account) {
                const isApproved = await instance.methods
                    .isApprovedForAll(account, PRNT_NFT_MARKETPLACE)
                    .call();
                setIsApproved(isApproved);
            }
        } catch (err) {
            alert('You need to install metamask and connect your wallet.');
        }
    };

    useEffect(() => {
        getPrnt();
    }, [account, isApproved]);

    const onBuy = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);

            await PrntNFTMarketplace.methods.buyPrntNFT(id, tokenId).send({
                from: account,
                value: prntPrice,
                gas: '500000',
            });
            setLoading(false);
            // alert(`Bought ${prnt.prntNFTName} NFT successfully`)
            window.location.reload();
        } catch (err) {
            console.log(err);
            setLoading(false);
            alert('Not enough funds.');
        }
    };

    useEffect(() => {
        const listBids = ownerArray.map((address) => {
            return (
                <Bids
                    key={address}
                    address={address}
                    title={
                        address === ownerArray[0] ? 'Created by' : 'Owned by'
                    }
                    by={`@${address.slice(0, 6)}....${address.slice(-7)}`}
                />
            );
        });
        listBids.reverse();
        setlistBids(listBids);

        const no_of_editions = tokenURI.attributes[0].value;
        // const edition[no_of_editions];
        const listNoOfEditions = () => {
            let listEditions = [];
            for (let i = 1; i <= no_of_editions; i++) {
                listEditions.push(<option value={i}>{i}</option>);
            }
            setListEditions(listEditions);
        };
        listNoOfEditions();
    }, [prnt]);

    const selectEdition = (e) => {
        setEdition(e.target.value);
        history.push(`/music/${id}/${e.target.value}`);
        window.location.reload();
    };

    return (
        <>
            <div style={{ maxWidth: '100vw' }}>
                {/* <h1>Artwork display</h1> */}
                {/* art piece */}
                <div className="art-c">
                    <div className="image-c">
                        {/* <img src={`https://ipfs.io/ipfs/${tokenURI.imageHash}`} alt="" /> */}
                        <ReactPlayer
                            className="video-player"
                            controls
                            // url={`https://ipfs.io/ipfs/${tokenURI.videoHash}`}
                            url={tokenURI.image}
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload',
                                    },
                                },
                            }}
                            width="70vw"
                            height="50vh"
                            // Disable right click
                            onContextMenu={(e) => e.preventDefault()}
                            onError={() => console.log('onError callback')}
                        />
                    </div>
                </div>
                {/* creator and owner */}
                <div className="det">
                    <div className="css-4cffwv">
                        <Link to={`/artists/${ownerArray[0]}`}>
                            <div className="css-1mitdaa">
                                <p>
                                    @
                                    {`${ownerArray[0].slice(
                                        0,
                                        6
                                    )}....${ownerArray[0].slice(-7)}`}
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="css-ykl0r1">
                        <div className="css-yk10r2">
                            <Link
                                to={`/artists/${ownerArray[totalOwners - 1]}`}
                            >
                                <div className="css-3ts36d">
                                    <p>
                                        @
                                        {`${ownerArray[totalOwners - 1].slice(
                                            0,
                                            6
                                        )}....${ownerArray[
                                            totalOwners - 1
                                        ].slice(-7)}`}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* description & history */}
                <div className="desc-his">
                    <div className="desc">
                        <div className="desc-1">
                            {/* <h2>Description</h2> */}
                            <div
                                style={{
                                    // padding: "10px 0px"
                                    display: 'grid',
                                    gridGap: '10px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '2vw',
                                        // flexDirection: 'row',
                                        // flexWrap: 'wrap',
                                        flexFlow: 'row wrap',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline',
                                    }}
                                >
                                    <div>
                                        <h3>{tokenURI.name}</h3>
                                        <h4>{tokenURI.symbol}</h4>
                                    </div>
                                    <div className="editions-dropdown">
                                        <h3>Edition</h3>
                                        <select
                                            // name="Editions"
                                            value={edition}
                                            onChange={selectEdition}
                                        >
                                            {/* <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option> */}
                                            {listEditions}
                                        </select>
                                    </div>
                                </div>

                                <span>{tokenURI.description}</span>
                            </div>
                            {/* <p>Animation and music created by Nacho </p>
                        <p>1400x1400</p>
                        <p>30fps</p> */}
                        </div>
                        <div className="desc-1">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: '10px 0px 10px 5px',
                                }}
                            >
                                <h2>Worth:</h2>
                                <h3 style={{ padding: '0px 10px' }}>
                                    {web3.utils.fromWei(prntPrice, 'ether')} ETH
                                </h3>
                            </div>
                            <div>
                                <p
                                    style={{
                                        fontFamily: 'cursive',
                                        padding: '0px 0px 10px 5px',
                                    }}
                                >
                                    Artist royalties: {prnt.royalties}%{' '}
                                </p>
                            </div>
                            <div style={{ padding: '5px 5px' }}>
                                {status === open &&
                                ownerArray[totalOwners - 1] !== account &&
                                ownerArray[0] !==
                                    account /*if he is the owner buy button won't be shown*/ ? (
                                    <button
                                        className="btn"
                                        onClick={onBuy}
                                        disabled={Loading}
                                    >
                                        {!Loading && <h4>Buy</h4>}
                                        {Loading && (
                                            <ReactLoading
                                                type="bubbles"
                                                height="30px"
                                                width="30px"
                                            />
                                        )}
                                    </button>
                                ) : null}
                                {ownerArray[totalOwners - 1] === account ? (
                                    status === open ? (
                                        <p style={{ color: 'green' }}>
                                            **Opened for trade
                                        </p>
                                    ) : (
                                        <>
                                            <button
                                                className="btn"
                                                onClick={toggle}
                                                disabled={Loading}
                                            >
                                                <h4>Trade</h4>
                                            </button>
                                            <Modal
                                                isShowing={isShowing}
                                                hide={toggle}
                                                prnt={prnt}
                                                id={id}
                                                tokenId={tokenId}
                                                PRNT_NFT_MARKETPLACE={
                                                    PRNT_NFT_MARKETPLACE
                                                }
                                                instance={instance}
                                                isApproved={isApproved}
                                                account={account}
                                                totalOwners={totalOwners}
                                            />
                                        </>
                                    )
                                ) : null}

                                {status !== open &&
                                ownerArray[totalOwners - 1] !== account ? (
                                    <p style={{ color: 'red' }}>
                                        **Not open for trade
                                    </p>
                                ) : null}
                            </div>
                            <Link
                                className="view-on"
                                to={{
                                    pathname: `https://testnets.opensea.io/assets/${id}/1`,
                                }}
                                target="_blank"
                            >
                                <h4>
                                    View on OpenSea <FaExternalLinkAlt />
                                </h4>
                            </Link>
                        </div>
                    </div>

                    {/* History */}

                    <div className="his-1">
                        <h2>History</h2>
                        <div className="bids-1">{listBids}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Art;
