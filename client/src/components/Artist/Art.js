import React, {useState, useEffect} from 'react'
import "../../css/Art.css";
import {Link, useParams} from 'react-router-dom';
import Bids from '../Bids';
import web3 from '../../ethereum/web3';
import PrntNFTData from '../../ethereum/PrntNFTData';
import PrntNFTMarketplace from '../../ethereum/PrntNFTMarketplace';
import PrntNFT from '../../ethereum/build/PrntNFT.json'
import PrntNFTFactory from '../../ethereum/PrntNFTFactory'
// import PrntNFT from '../../ethereum/PrntNFT';
// import PrntNFT from '../../ethereum/build/PrntNFT.json';

const Art = ({creator}) => {
    const {id} = useParams();
    
    const [prnt, setprnt] = useState(["","","","","","","",""])
    const [account, setaccount] = useState("")
    const [status, setstatus] = useState("")
    //bytes32 for "Open"
    const open = "0x4f70656e00000000000000000000000000000000000000000000000000000000"
    //bytes32 from "Cancelled"
    const cancelled = "0x43616e63656c6c65640000000000000000000000000000000000000000000000"

    

    // console.log(id);
    const getPrnt = async () => {
        const accounts = await web3.eth.getAccounts();
        const prnt = await PrntNFTData.methods.getPrntByNFTAddress(id).call();
        const trade = await PrntNFTMarketplace.methods.getTrade(id).call();
        // const status = trade.status.toString();
        setstatus(trade.status);
        console.log("status", status);

        console.log(prnt)
        console.log(typeof prnt[4])
        // console.log(typeof parseInt(prnt[4]))
        setaccount(accounts[0])
        setprnt(prnt);
        
    }

    useEffect(() => {
        getPrnt();
    }, [status])

    const onBuy = async (event) => {
        event.preventDefault();
        try{
            // const instance = new web3.eth.Contract(
            //     PrntNFT.abi,
            //     id
            // );

            // const isApproved = await instance.methods.isApprovedForAll(prnt[3], "0x74a3F9166F311007086811B1cA469c563eB4D676").call();
            // // const isApproved = await PrntNFT.methods.isApprovedForAll(prnt[3], "0x1d095Ce09b8Df62570D7Db99DCddF523EdA6521c").call();

            // console.log(isApproved);

            await PrntNFTMarketplace.methods.buyPrntNFT(id)
            .send({
                from: account,
                value: prnt[4],
                gas: "1000000" 
            })
            alert(`Bought ${prnt.prntNFTName} NFT successfully`)
        } catch(err) {
            console.log(err);
            alert("Not enough funds.")
        }
    }

    const onOpenTrade = async (event) => {
        event.preventDefault();
        try{
            await PrntNFTMarketplace.methods.openTradeWhenCreateNewPrntNFT(id, 1, prnt[4])
            .send({
                from: account,
            })
        } catch(err) {
            console.log(err);
            alert("Trade can't be open")
        }
    }

    const openTrade = async (event) => {
        event.preventDefault();
        try {
            const PRNT_NFT_MARKETPLACE = await PrntNFTFactory.methods.prntNFTMarketplace().call();

            const instance = new web3.eth.Contract(
                PrntNFT.abi,
                id //PrntNFT address
            );
            alert("You have to give approval to the contract before opening NFT for trade")

            await instance.methods.setApprovalForAll(
                PRNT_NFT_MARKETPLACE,
                true
            ).send({
                from: account
            });
            alert("Approval given, now you can open the NFT for trade")
            await PrntNFTMarketplace.methods.openTrade(id, 1)
            .send ({
                from: account
            })
            alert("NFT open for trade")
        } catch(err) {
            console.log(err);
            alert("trade can't be open")
        }
    }

    return (
        <div>
            {/* <h1>Artwork display</h1> */}
            {/* art piece */}
            <div className="art-c">
                <div className="image-c">
                    <img src={`https://ipfs.io/ipfs/${prnt[5]}`} alt="" />
                </div>
            </div>
            {/* creator and owner */}
            <div className="det">
                <div className="css-4cffwv">
                    <Link to={`/artists/${creator}`}>
                        <div className="css-1mitdaa">@{creator}</div>
                    </Link>
                </div>
                
                <div className="css-ykl0r1">
                    <div className="css-yk10r2">
                    <Link to={`/artists/${prnt[3]}`}>
                        <div className="css-3ts36d">
                            <p>@{`${prnt[3].slice(0,6)}....${prnt[3].slice(-7)}`}</p>
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
                        <p>Animation and music created by Nacho </p>
                        <p>1400x1400</p>
                        <p>30fps</p>
                        
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
                            (status === open && prnt[3] !== account)
                            ? 
                            <button className="btn" onClick={onBuy} >Buy</button>
                            :
                            null
                        }
                        {
                            prnt[3] === account
                            ?
                            (
                                status === cancelled
                                ?
                                <button className="btn" onClick = {openTrade} >Open for Trade</button>
                                : 
                                (
                                    status !== open && status !== cancelled
                                    ?
                                    <button className="btn" onClick = {onOpenTrade} >Open for 1st Trade</button>
                                    :
                                    <p style={{color: "green"}}>**Opened for trade</p>
                                )
                            )
                            :
                            null
                            
                        }
                        
                        {
                            (status !== open && prnt[3] !== account)
                            ?
                            <p style={{color: "red"}}>**Not open for trade</p>
                            :
                            null
                        }
                          
                    </div>
                </div>
                <div className="his-1">
                    <h2>History</h2>
                    <div className="bids-1">
                        <Bids title="Created by" by={`@${creator}`} /> 
                        <Bids title="Owned by" by={`@${prnt[3].slice(0,6)}....${prnt[3].slice(-7)}`} />
                        <Bids />
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}

Art.defaultProps = {
    creator: "creator",
}

export default Art
