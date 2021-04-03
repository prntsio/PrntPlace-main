pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import { PrntNFTDataObjects } from "./PrntNFTDataObjects.sol";


// shared storage
contract PrntNFTDataStorages is PrntNFTDataObjects {

    Prnt[] public prnts;

}

