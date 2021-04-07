pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import { PrntNFT } from "./PrntNFT.sol";


contract PrntNFTDataObjects {

    struct Prnt {  /// [Key]: index of array
        PrntNFT prntNFT;
        string prntNFTName;
        string prntNFTSymbol;
        address[] ownerAddress;
        uint prntPrice;
        string ipfsHashOfPrnt;
        string status;  /// "Open" or "Cancelled"
        uint256 reputation;
    }
    
    struct Artists {
        address[] values;
        mapping (address => bool) is_in;
    }
}
