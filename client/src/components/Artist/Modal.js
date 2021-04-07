import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';
import '../../css/Modal.css';
import PrntNFTMarketplace from '../../ethereum/PrntNFTMarketplace';

const Modal = ({isShowing, hide, prnt, id, PRNT_NFT_MARKETPLACE, instance, isApproved, account, totalOwners}) => {
  
    const [Approving, setApproving] = useState(false)
    const [Trading, setTrading] = useState(false)

    const onApprove = async () => {
        try {
            console.log(instance)
            console.log(PRNT_NFT_MARKETPLACE)
            console.log(account)
            setApproving(true);
            await instance.methods.setApprovalForAll(
                PRNT_NFT_MARKETPLACE,
                true
            ).send({
                from: account
            });
            // alert("Approved!!")
            setApproving(false)
            window.location.reload()
        } catch (err) {
            console.log(err);
            alert("Approve not working..")
            setApproving(false)
            window.location.reload();
        }
    }

    const onOpenTrade = async () => {
        try {
            setTrading(true);
            totalOwners !== 1
            ?
            await PrntNFTMarketplace.methods.openTrade(id, 1)
            .send ({
                from: account
            })
            :
            await PrntNFTMarketplace.methods.openTradeWhenCreateNewPrntNFT(id, 1, prnt[4])
            .send({
                from: account,
            })
            setTrading(false);
            // alert("NFT open for trade")
            window.location.reload();
        } catch(err){
            console.log(err);
            setTrading(false)
            alert("open trade not working..")
            window.location.reload();
        }
    }

    return (
        isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay"/>
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                    <div className="modal-header">
                        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-content">
                        <div className="card">
                            {
                                !isApproved
                                ?
                                <>
                                    <p className="content-title">To open your NFT for trade you have to give approval to the smart contract.</p>
                                    <br/>
                                    <button className="btn but-ton" onClick={onApprove} disabled={isApproved} style={{backgroundColor: isApproved ? "grey" : "black" }}>
                                        {/* Approve */}
                                        {
                                            Approving && <ReactLoading type="bubbles" height={30} width={30} />
                                        }
                                        {
                                            !Approving && <span>Approve</span>
                                        }
                                    </button>
                                </>
                                :
                                <h2 style={{color: "green", alignSelf: "center", justifySelf: "center"}}>Approved!</h2>
                            }
                            
                        </div>
                        <div className="card">
                            <p className="content-tile">
                                {
                                    isApproved
                                    ?
                                    "Now you can open for trade."
                                    :
                                    "After approval you can open for trade."
                                }
                                
                            </p>
                            <br/>
                            <button className="btn but-ton" onClick={onOpenTrade} disabled={!isApproved} style={{backgroundColor: !isApproved ? "grey" : "black" }}>
                                {/* Open for trade */}
                                {
                                    Trading && <ReactLoading type="bubbles" height={30} width={30} />
                                }
                                {
                                    !Trading && <span>Open for Trade</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>, 
        document.body
        ) : null
    
    )
    
}

export default Modal;