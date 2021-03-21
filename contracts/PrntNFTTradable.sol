pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import { PrntNFT } from "./PrntNFT.sol";
import { PrntNFTData } from "./PrntNFTData.sol";


/**
 * @title - PrntNFTTradable contract
 * @notice - This contract has role that put on sale of prntNFTs
 */
contract PrntNFTTradable {
    event TradeStatusChange(uint256 ad, bytes32 status);

    PrntNFT public prntNFT;
    PrntNFTData public prntNFTData;

    struct Trade {
        address seller;
        uint256 prntId;  /// PrntNFT's token ID
        uint256 prntPrice;
        bytes32 status;   /// Open, Executed, Cancelled
    }
    mapping(uint256 => Trade) public trades;  /// [Key]: PrntNFT's token ID

    uint256 tradeCounter;

    constructor(PrntNFTData _prntNFTData) public {
        prntNFTData = _prntNFTData;
        tradeCounter = 0;
    }

    /**
     * @notice - This method is only executed when a seller create a new PrntNFT
     * @dev Opens a new trade. Puts _prntId in escrow.
     * @param _prntId The id for the prntId to trade.
     * @param _prntPrice The amount of currency for which to trade the prntId.
     */
    function openTradeWhenCreateNewPrntNFT(PrntNFT prntNFT, uint256 _prntId, uint256 _prntPrice) public {
        prntNFT.transferFrom(msg.sender, address(this), _prntId);

        tradeCounter += 1;    /// [Note]: New. Trade count is started from "1". This is to align prntId
        trades[tradeCounter] = Trade({
            seller: msg.sender,
            prntId: _prntId,
            prntPrice: _prntPrice,
            status: "Open"
        });
        //tradeCounter += 1;  /// [Note]: Original
        emit TradeStatusChange(tradeCounter - 1, "Open");
    }

    /**
     * @dev Opens a trade by the seller.
     */
    function openTrade(PrntNFT prntNFT, uint256 _prntId) public {
        prntNFTData.updateStatus(prntNFT, "Open");

        Trade storage trade = trades[_prntId];
        require(
            msg.sender == trade.seller,
            "Trade can be open only by seller."
        );
        prntNFT.transferFrom(msg.sender, address(this), trade.prntId);
        trades[_prntId].status = "Open";
        emit TradeStatusChange(_prntId, "Open");
    }

    /**
     * @dev Cancels a trade by the seller.
     */
    function cancelTrade(PrntNFT prntNFT, uint256 _prntId) public {
        prntNFTData.updateStatus(prntNFT, "Cancelled");
        
        Trade storage trade = trades[_prntId];
        require(
            msg.sender == trade.seller,
            "Trade can be cancelled only by seller."
        );
        require(trade.status == "Open", "Trade is not Open.");
        prntNFT.transferFrom(address(this), trade.seller, trade.prntId);
        trades[_prntId].status = "Cancelled";
        emit TradeStatusChange(_prntId, "Cancelled");
    }

    /**
     * @dev Executes a trade. Must have approved this contract to transfer the amount of currency specified to the seller. Transfers ownership of the prntId to the filler.
     */
    function transferOwnershipOfPrntNFT(PrntNFT _prntNFT, uint256 _prntId, address _buyer) public {
        PrntNFT prntNFT = _prntNFT;

        Trade memory trade = getTrade(_prntId);
        require(trade.status == "Open", "Trade is not Open.");

        _updateSeller(_prntNFT, _prntId, _buyer);

        prntNFT.transferFrom(address(this), _buyer, trade.prntId);
        getTrade(_prntId).status = "Cancelled";
        emit TradeStatusChange(_prntId, "Cancelled");
    }

    function _updateSeller(PrntNFT prntNFT, uint256 _prntId, address _newSeller) internal {
        Trade storage trade = trades[_prntId];
        trade.seller = _newSeller;
    }


    /**
     * @dev - Returns the details for a trade.
     */
    function getTrade(uint256 _prntId) public view returns (Trade memory trade_) {
        Trade memory trade = trades[_prntId];
        return trade;
        //return (trade.seller, trade.prntId, trade.prntPrice, trade.status);
    }
}
