pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import { PrntNFT } from "../../PrntNFT.sol";


contract PrntNFTFactoryEvents {

    event PrntNFTCreated (
        address owner,
        PrntNFT prntNFT,
        string nftName, 
        string nftSymbol, 
        uint prntPrice, 
        string ipfsHashOfPrnt
    );

    event AddReputation (
        uint256 tokenId,
        uint256 reputationCount
    );

}
