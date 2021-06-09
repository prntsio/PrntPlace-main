pragma solidity ^0.5.17;
pragma experimental ABIEncoderV2;
import { PrntNFTDataStorages } from "./PrntNFTDataStorages.sol";
import { PrntNFT } from "./PrntNFT.sol";

/**
 * @notice - This is the storage contract for prntNFTs
 */
contract PrntNFTData is PrntNFTDataStorages {

    address[] public prntAddresses;
    Artists artists;
    
    constructor() public {}

    /**
     * @notice - Save metadata of a prntNFT
     */
    function saveMetadataOfPrntNFT(
        address[] memory _prntAddresses,
        PrntNFT _prntNFT, 
        string memory tokenUri,
        uint256 quantity, 
        address _ownerAddress, 
        uint _prntPrice,
        uint256 royalties
    ) public {
        /// Save metadata of a prntNFT of prnt
       
        Prnt memory prnt;
        
        prnt.prntNFT = _prntNFT;
        prnt.tokenUri = tokenUri;
        prnt.royalties = royalties;
        
        prnts.push(prnt);
        
        for(uint256 _tokenId=1; _tokenId <= quantity; _tokenId++){
            address[] memory ownerAddress;
            
            tokensByAddress[address(_prntNFT)][_tokenId] = Token({
                ownerAddress: ownerAddress,
                prntPrice: _prntPrice,
                status: "Open"
            });
            
            tokensByAddress[address(_prntNFT)][_tokenId].ownerAddress.push(_ownerAddress);
        }
        
        /// Update prntAddresses
        prntAddresses = _prntAddresses;     
    }
    
    /**
     * @notice - Update owner address of a prntNFT by transferring ownership
     */
    function updateOwnerOfPrntNFT(PrntNFT _prntNFT, uint256 tokenId, address _newOwner) public returns (bool) {
        require (_newOwner != address(0), "A new owner address should be not empty");
        tokensByAddress[address(_prntNFT)][tokenId].ownerAddress.push(_newOwner);
    }

    /**
     * @notice - Update status ("Open" or "Cancelled")
     */
    function updateStatus(PrntNFT _prntNFT, uint256 tokenId, string memory _newStatus) public returns (bool) {
        tokensByAddress[address(_prntNFT)][tokenId].status = _newStatus;
    }
    
    function updateNewPrntPriceForTrade(PrntNFT _prntNFT, uint256 _tokenId, uint256 _prntPrice) public {
        tokensByAddress[address(_prntNFT)][_tokenId].prntPrice = _prntPrice;
    }

    ///-----------------
    /// Getter methods
    ///-----------------
    function getPrnt(uint256 index) internal view returns (Prnt memory _prnt) {
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
        
        /// Identify member's index
        uint prntIndex;
        for (uint i=0; i < prntAddresses.length; i++) {
            if (prntAddresses[i] == address(prntNFT)) {
                prntIndex = i;
            }
        }

        Prnt memory prnt = prnts[prntIndex];
        return prnt;
    }

    function getAllPrnts() public view returns (Prnt[] memory _prnts) {
        return prnts;
    }
    
    function addArtist(address artist) public returns (bool) {
        if (!artists.is_in[artist]) {
            artists.values.push(artist);
            artists.is_in[artist] = true;
        }
    }
    
    function getAllArtists() public view returns (address[] memory) {
        return artists.values;
    }
    
    function getOwnerOfToken(PrntNFT _prntNFT, uint256 _tokenId) public view returns(address[] memory ownerAddress) {
        return tokensByAddress[address(_prntNFT)][_tokenId].ownerAddress;
    }
}
