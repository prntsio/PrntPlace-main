import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router';
import './ApproveModal.css';
import PrntNFTMarketplace from '../../../ethereum/PrntNFTMarketplace';
import web3 from '../../../ethereum/web3';

const Modal = ({
    isShowing,
    hide,
    id,
    tokenId,
    PRNT_NFT_MARKETPLACE,
    instance,
    isApproved,
    account,
    totalOwners,
}) => {
    const [Approving, setApproving] = useState(false);
    const [Trading, setTrading] = useState(false);
    const [newPrice, setnewPrice] = useState('');

    const onApprove = async () => {
        try {
            console.log(instance);
            console.log(PRNT_NFT_MARKETPLACE);
            console.log(account);
            setApproving(true);
            await instance.methods
                .setApprovalForAll(PRNT_NFT_MARKETPLACE, true)
                .send({
                    from: account,
                });
            // alert("Approved!!")
            setApproving(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
            alert('Approve not working..');
            setApproving(false);
            window.location.reload();
        }
    };

    const onOpenTrade = async () => {
        // const newPrice = 10000; // wei
        try {
            setTrading(true);
            totalOwners !== 1
                ? await PrntNFTMarketplace.methods
                      .openTrade(
                          id,
                          tokenId,
                          web3.utils.toWei(newPrice, 'ether')
                      )
                      .send({
                          from: account,
                      })
                : await PrntNFTMarketplace.methods
                      .openTradeWhenCreateNewPrntNFT(
                          id,
                          tokenId,
                          web3.utils.toWei(newPrice, 'ether')
                      )
                      .send({
                          from: account,
                      });
            setTrading(false);
            // alert("NFT open for trade")
            window.location.reload();
        } catch (err) {
            console.log(err);
            setTrading(false);
            alert('open trade not working..');
            window.location.reload();
        }
    };

    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className="modal-overlay" />
                  <div
                      className="modal-wrapper"
                      onClick={hide}
                      aria-modal
                      aria-hidden
                      tabIndex={-1}
                      role="dialog"
                  >
                      <div
                          className="modal"
                          onClick={(e) => e.stopPropagation()}
                      >
                          <div className="modal-header">
                              <button
                                  type="button"
                                  className="modal-close-button"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={hide}
                              >
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-content">
                              <div className="card">
                                  {!isApproved ? (
                                      <>
                                          <p className="content-title">
                                              To open your NFT for trade you
                                              have to give approval to the smart
                                              contract.
                                          </p>
                                          <br />
                                          <button
                                              className="btn but-ton"
                                              onClick={onApprove}
                                              disabled={isApproved}
                                              style={{
                                                  color: isApproved
                                                      ? 'grey'
                                                      : 'black',
                                              }}
                                          >
                                              {/* Approve */}
                                              {Approving && (
                                                  <ReactLoading
                                                      type="bubbles"
                                                      height={30}
                                                      width={30}
                                                  />
                                              )}
                                              {!Approving && <h4>Approve</h4>}
                                          </button>
                                      </>
                                  ) : (
                                      <h2
                                          style={{
                                              color: '#a3d0d2db',
                                              alignSelf: 'center',
                                              justifySelf: 'center',
                                          }}
                                      >
                                          Approved!
                                      </h2>
                                  )}
                              </div>
                              <div className="card">
                                  <p className="content-tile">
                                      {isApproved ? (
                                          <div>
                                              <p>Now you can open for trade.</p>
                                              <input
                                                  className="user-input"
                                                  style={{
                                                      width: '250px',
                                                  }}
                                                  placeholder="Trade price in ETH"
                                                  value={newPrice}
                                                  onChange={(e) =>
                                                      setnewPrice(
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </div>
                                      ) : (
                                          'After approval you can open for trade.'
                                      )}
                                  </p>
                                  <br />
                                  <button
                                      className="btn but-ton"
                                      onClick={onOpenTrade}
                                      disabled={!isApproved}
                                      style={{
                                          color: !isApproved ? 'grey' : 'black',
                                      }}
                                  >
                                      {/* Open for trade */}
                                      {Trading && (
                                          <ReactLoading
                                              type="bubbles"
                                              height={30}
                                              width={30}
                                          />
                                      )}
                                      {!Trading && <h4>Open for Trade</h4>}
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.body
          )
        : null;
};

export default withRouter(Modal);
