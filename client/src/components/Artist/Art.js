import React, {useState, useEffect} from 'react'
// import { ReactVideo, ReactAudio, YoutubePlayer } from "reactjs-media";
import ReactPlayer from 'react-player';
import "../../css/Art.css";
import {Link, useParams} from 'react-router-dom';
import ReactLoading from 'react-loading';
import Bids from '../Bids';
import web3 from '../../ethereum/web3';
import PrntNFTData from '../../ethereum/PrntNFTData';
import PrntNFTMarketplace from '../../ethereum/PrntNFTMarketplace';
import PrntNFT from '../../ethereum/build/PrntNFT.json'
import PrntNFTFactory from '../../ethereum/PrntNFTFactory'

import Modal from './Modal';
import useModal from './useModal';


const Art = ({account}) => {
    const {id} = useParams();

    const {isShowing, toggle} = useModal();
    
    const [prnt, setprnt] = useState(["","","",[""],"","","",""])
    const [totalOwners, settotalOwners] = useState(1)
    // const [account, setaccount] = useState(null)
    // const [Account, setAccount] = useState("")
    const [status, setstatus] = useState("")
    const [PRNT_NFT_MARKETPLACE, setPRNT_NFT_MARKETPLACE] = useState("")
    const [listBids, setlistBids] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [instance, setInstance] = useState();
    const [isApproved, setIsApproved] = useState(false)

    //bytes32 for "Open"
    const open = "0x4f70656e00000000000000000000000000000000000000000000000000000000"
    //bytes32 from "Cancelled"
    // const cancelled = "0x43616e63656c6c65640000000000000000000000000000000000000000000000"

    

    // console.log(id);
    const getPrnt = async () => {
        try {
            // const accounts = await web3.eth.getAccounts();
            // console.log(accounts[0])
            // setaccount(accounts[0])
            // setaccount(accounts[0])
            console.log("account:",account);
            const prnt = await PrntNFTData.methods.getPrntByNFTAddress(id).call();
            const trade = await PrntNFTMarketplace.methods.getTrade(id).call();
            const PRNT_NFT_MARKETPLACE = await PrntNFTFactory.methods.prntNFTMarketplace().call();
            setPRNT_NFT_MARKETPLACE(PRNT_NFT_MARKETPLACE);
            setstatus(trade.status);
            const instance = new web3.eth.Contract(
                PrntNFT.abi,
                id //PrntNFT address
            );
            setInstance(instance);
            console.log(prnt)
            
            setprnt(prnt);
            
            if(account) {
                const isApproved = await instance.methods.isApprovedForAll(account, PRNT_NFT_MARKETPLACE).call();
                setIsApproved(isApproved)
            }
            
            const totalOwners = prnt[3].length;
            settotalOwners(totalOwners);
        } catch (err) {
            alert('You need to install metamask and connect your wallet.');
        }
        
    }

    useEffect(() => {
        getPrnt();
    }, [account, isApproved])

    const onBuy = async (event) => {
        event.preventDefault();
        try{
            setLoading(true);
            await PrntNFTMarketplace.methods.buyPrntNFT(id)
            .send({
                from: account,
                value: prnt[4],
                gas: "1000000" 
            })
            setLoading(false);
            // alert(`Bought ${prnt.prntNFTName} NFT successfully`)
            window.location.reload();
        } catch(err) {
            console.log(err);
            setLoading(false)
            alert("Not enough funds.")
        }
    }

    
    useEffect(() => {
        const listBids = prnt[3].map(address => {
            return (
                <Bids key={address} address = {address} title={address === prnt[3][0] ? "Created by" : "Owned by"} by={`@${address.slice(0,6)}....${address.slice(-7)}`} />
            );
        })
        listBids.reverse();
        setlistBids(listBids);
        
    }, [prnt])

    return (
        <div>
            {/* <h1>Artwork display</h1> */}
            {/* art piece */}
            <div className="art-c">
                <div className="image-c">
                    {/* <img src={`https://ipfs.io/ipfs/${prnt[6]}`} alt="" /> */}
                    <ReactPlayer
                        className="video-player"
                        controls
                        url = {`https://ipfs.io/ipfs/${prnt[5]}`}
                        config={{ file: { 
                            attributes: { 
                                controlsList: 'nodownload' 
                            } 
                        }}}
                        width="70vw"
                        height="50vh"
                        // Disable right click
                        onContextMenu={e => e.preventDefault()}
                        onError={() => console.log('onError callback')}
                    />
                        
                </div>
            </div>
            {/* creator and owner */}
            <div className="det">
                <div className="css-4cffwv">
                    <Link to={`/artists/${prnt[3][0]}`}>
                        <div className="css-1mitdaa">
                            <p>@{`${prnt[3][0].slice(0,6)}....${prnt[3][0].slice(-7)}`}</p>
                        </div>
                    </Link>
                </div>
                
                <div className="css-ykl0r1">
                    <div className="css-yk10r2">
                    <Link to={`/artists/${prnt[3][totalOwners-1]}`}>
                        <div className="css-3ts36d">
                            <p>@{`${prnt[3][totalOwners-1].slice(0,6)}....${prnt[3][totalOwners-1].slice(-7)}`}</p>
                        </div>
                    </Link>
                    </div>
                </div>
            </div>
            {/* description & history */}
            <div className="desc-his">
                <div className="desc">
                    <div className="desc-1">
                        <h2>Description</h2>
                        
                        <h3>{prnt[1]}</h3>
                        <p>{prnt[2]}</p>
                        {/* <p>Animation and music created by Nacho </p>
                        <p>1400x1400</p>
                        <p>30fps</p> */}
                        
                    </div>
                    <div className="desc-1">
                        <div 
                            style={{
                                display: 'flex',
                                alignItems: "center", 
                                margin: "10px 0px 20px 5px" 
                            }} 
                        >
                            <h2>Worth:</h2>
                            <h3 style={{padding: "0px 10px"}}>{web3.utils.fromWei(prnt[4],'ether')} ETH</h3>
                        </div>
                        {
                            (status === open && prnt[3][totalOwners-1] !== account && prnt[3][0] !== account) /*if he is the owner buy button won't be shown*/
                            ? 
                            <button className="btn" onClick={onBuy} disabled={Loading}>
                            {
                                !Loading && <span>Buy</span>
                            }   
                            {
                                Loading && <ReactLoading type="bubbles" height="30px" width="30px" />
                            }
                            </button>
                            :
                            null
                        }
                        {
                            prnt[3][totalOwners-1] === account
                            ?
                            (
                                status === open 
                                ?
                                <p style={{color: "green"}}>**Opened for trade</p>
                                :
                                <>
                                    <button className="btn" onClick = {toggle} disabled={Loading}>Trade</button>
                                    <Modal 
                                        isShowing={isShowing}
                                        hide={toggle}
                                        prnt={prnt}
                                        id={id}
                                        PRNT_NFT_MARKETPLACE={PRNT_NFT_MARKETPLACE}
                                        instance={instance}
                                        isApproved={isApproved}
                                        account={account}
                                        totalOwners={totalOwners}
                                    />
                                </>
                            )
                            :
                            null
                        }
                        
                        {
                            (status !== open && prnt[3][totalOwners-1] !== account)
                            ?
                            <p style={{color: "red"}}>**Not open for trade</p>
                            :
                            null
                        }
                          
                    </div>
                </div>

                {/* History */}

                <div className="his-1">
                    <h2>History</h2>
                    <div className="bids-1">
                        {listBids}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Art
