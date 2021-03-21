pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import { PrntNFTDataStorages } from "./prnt-nft-data/commons/PrntNFTDataStorages.sol";
import { PrntNFT } from "./PrntNFT.sol";


/**
 * @notice - This is the storage contract for prntNFTs
 */
contract PrntNFTData is PrntNFTDataStorages {

    address[] public prntAddresses;

    constructor() public {}

    /**
     * @notice - Save metadata of a prntNFT
     */
    function saveMetadataOfPrntNFT(
        address[] memory _prntAddresses, 
        PrntNFT _prntNFT, 
        string memory _prntNFTName, 
        string memory _prntNFTSymbol, 
        address _ownerAddress, 
        uint _prntPrice, 
        string memory _ipfsHashOfPrnt
    ) public returns (bool) {
        /// Save metadata of a prntNFT of prnt
        Prnt memory prnt = Prnt({
            prntNFT: _prntNFT,
            prntNFTName: _prntNFTName,
            prntNFTSymbol: _prntNFTSymbol,
            ownerAddress: _ownerAddress,
            prntPrice: _prntPrice,
            ipfsHashOfPrnt: _ipfsHashOfPrnt,
            status: "Open",
            reputation: 0
        });
        prnts.push(prnt);

        /// Update prntAddresses
        prntAddresses = _prntAddresses;     
    }

    /**
     * @notice - Update owner address of a prntNFT by transferring ownership
     */
    function updateOwnerOfPrntNFT(PrntNFT _prntNFT, address _newOwner) public returns (bool) {
        /// Identify prnt's index
        uint prntIndex = getPrntIndex(_prntNFT);

        /// Update metadata of a prntNFT of prnt
        Prnt storage prnt = prnts[prntIndex];
        require (_newOwner != address(0), "A new owner address should be not empty");
        prnt.ownerAddress = _newOwner;  
    }

    /**
     * @notice - Update status ("Open" or "Cancelled")
     */
    function updateStatus(PrntNFT _prntNFT, string memory _newStatus) public returns (bool) {
        /// Identify prnt's index
        uint prntIndex = getPrntIndex(_prntNFT);

        /// Update metadata of a prntNFT of prnt
        Prnt storage prnt = prnts[prntIndex];
        prnt.status = _newStatus;  
    }


    ///-----------------
    /// Getter methods
    ///-----------------
    function getPrnt(uint index) public view returns (Prnt memory _prnt) {
        Prnt memory prnt = prnts[index];
        return prnt;
    }

    function getPrntIndex(PrntNFT prntNFT) public view returns (uint _prntIndex) {
        address PRNT_NFT = address(prntNFT);

        /// Identify member's index
        uint prntIndex;
        for (uint i=0; i < prntAddresses.length; i++) {
            if (prntAddresses[i] == PRNT_NFT) {
                prntIndex = i;
            }
        }

        return prntIndex;   
    }

    function getPrntByNFTAddress(PrntNFT prntNFT) public view returns (Prnt memory _prnt) {
        address PRNT_NFT = address(prntNFT);

        /// Identify member's index
        uint prntIndex;
        for (uint i=0; i < prntAddresses.length; i++) {
            if (prntAddresses[i] == PRNT_NFT) {
                prntIndex = i;
            }
        }

        Prnt memory prnt = prnts[prntIndex];
        return prnt;
    }

    function getAllPrnts() public view returns (Prnt[] memory _prnts) {
        return prnts;
    }

}
