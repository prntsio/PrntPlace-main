pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import { PrntNFT } from "../../PrntNFT.sol";


contract PrntNFTMarketplaceEvents {

    event PrntNFTOwnershipChanged (
        PrntNFT prntNFT,
        uint prntId, 
        address ownerBeforeOwnershipTransferred,
        address ownerAfterOwnershipTransferred
    );

}
