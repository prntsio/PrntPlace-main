pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import { PrntNFT } from "./PrntNFT.sol";


contract PrntNFTDataObjects {

    struct Prnt {  /// [Key]: index of array
        PrntNFT prntNFT;
        string tokenUri;
        uint256 royalties;
    }
    
    mapping(address => mapping(uint256 => Token)) public tokensByAddress;
    
    struct Token {
        uint prntPrice;
        address[] ownerAddress;
        string status;
    }
    
    struct Artists {
        address[] values;
        mapping (address => bool) is_in;
    }
}
