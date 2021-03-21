pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/ownership/Ownable.sol";


contract PhOwnable is Ownable {

    // example
    modifier onlyStakingPerson(uint _time) { 
        require (now >= _time);
        _;
    }
    
}
