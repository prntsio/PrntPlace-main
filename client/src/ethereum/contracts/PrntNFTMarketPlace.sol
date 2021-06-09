pragma solidity ^0.5.17;
pragma experimental ABIEncoderV2;
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { PrntNFT } from "./PrntNFT.sol";
import { PrntNFTTradable } from "./PrntNFTTradable.sol";
import { PrntNFTMarketplaceEvents } from "./PrntNFTMarketplaceEvents.sol";
import { PrntNFTData } from "./PrntNFTData.sol";


contract PrntNFTMarketplace is PrntNFTTradable, PrntNFTMarketplaceEvents {
    using SafeMath for uint256;
    
    address admin;
    
    mapping(address => PrntNFTData.Prnt[]) collections;

    address payable public PRNT_NFT_MARKETPLACE;

    PrntNFTData public prntNFTData;

    constructor(PrntNFTData _prntNFTData) public PrntNFTTradable(_prntNFTData) {
        admin = msg.sender;
        prntNFTData = _prntNFTData;
        PRNT_NFT_MARKETPLACE = address(uint160(address(this)));
    }

    /** 
     * @notice - Buy function is that buy NFT token and ownership transfer. (Reference from IERC721.sol)
     * @notice - msg.sender buy NFT with ETH (msg.value)
    //  * @notice - PrntID is always 1. Because each prntNFT is unique.
     */
    function buyPrntNFT(PrntNFT prntNFT, uint256 tokenId) public payable returns (bool) {
        (uint prntPrice,) = prntNFTData.tokensByAddress(address(prntNFT), tokenId);
        require (msg.value >= prntPrice, "msg.value should be equal to the buyAmount");
        
        address[] memory ownerAddress = prntNFTData.getOwnerOfToken(prntNFT, tokenId);
        
        address _seller = ownerAddress[ownerAddress.length-1];  /// current owner
        address payable seller = address(uint160(_seller));  /// Convert owner address with payable

        // Pay marketplace fees 
        uint256 marketplaceFees;
        uint256 royaltyAmount = 0;
        if(ownerAddress.length == 1){   // first sale 10% fees 
            marketplaceFees = prntPrice.mul(uint256(10)).div(uint256(100));
            transferMarketplaceFees(marketplaceFees);
        } else{     // secondary sales 3% fees
            marketplaceFees = prntPrice.mul(uint256(3)).div(uint256(100));
            transferMarketplaceFees(marketplaceFees);
            // Tranfer royalties to the creator of the NFT   
            uint256 royalties = prntNFTData.getPrntByNFTAddress(prntNFT).royalties;
            uint256 royaltyAmount = prntPrice.mul(royalties).div(uint256(100));
            transferRoyalties(ownerAddress[0], royaltyAmount);
        }
        
        /// Bought-amount is transferred into a seller wallet
        seller.transfer(prntPrice.sub(royaltyAmount).sub(marketplaceFees)); 
        
        /// Approve a buyer address as a receiver before NFT's transferFrom method is executed
        // address buyer = msg.sender;
        // uint prntId = 1;  /// [Note]: PrntID is always 1. Because each prntNFT is unique.
        prntNFT.approve(msg.sender, tokenId);
        
        address ownerBeforeOwnershipTransferred = prntNFT.ownerOf(tokenId);
        
        /// Transfer Ownership of the PrntNFT from a seller to a buyer
        transferOwnershipOfPrntNFT(prntNFT, tokenId, msg.sender);    
        prntNFTData.updateOwnerOfPrntNFT(prntNFT, tokenId, msg.sender);
        prntNFTData.updateStatus(prntNFT, tokenId, "Cancelled");

        /// Event for checking result of transferring ownership of a prntNFT
        address ownerAfterOwnershipTransferred = prntNFT.ownerOf(tokenId);
        
        PrntNFTData.Prnt memory _prnt = prntNFTData.getPrntByNFTAddress(prntNFT);
        collections[msg.sender].push(_prnt);
        
        prntNFTData.addArtist(msg.sender);
        
        emit PrntNFTOwnershipChanged(prntNFT, tokenId, ownerBeforeOwnershipTransferred, ownerAfterOwnershipTransferred);
    }
    
    function getCollections(address owner) public view returns (PrntNFTData.Prnt[] memory) {
        return collections[owner];
    }
    
    /**
     * @dev transferRoyalties to the creator
     * @param royaltyAmount The amount to be transferred to the creator
     * @param _creator The address of the creator
     */
     function transferRoyalties(address _creator, uint256 royaltyAmount) internal {
         address payable creator = address(uint160(_creator));
         creator.transfer(royaltyAmount);
     }
     
     function transferMarketplaceFees(uint256 marketplaceFees) internal {
         address payable _admin = address(uint160(admin));
         _admin.transfer(marketplaceFees);
     }
    
    ///-----------------------------------------------------
    /// Methods below are pending methods
    ///-----------------------------------------------------

    /** 
     * @dev reputation function is that gives reputation to a user who has ownership of being posted prnt.
     * @dev Each user has reputation data in struct
     */
    // function reputation(address from, address to, uint256 prntId) public returns (uint256, uint256) {

    //     // Prnt storage prnt = prnts[prntId];
    //     // prnt.reputation = prnt.reputation.add(1);

    //     // emit AddReputation(prntId, prnt.reputation);

    //     // return (prntId, prnt.reputation);
    //     return (0, 0);
    // }
    

    // function getReputationCount(uint256 prntId) public view returns (uint256) {
    //     uint256 curretReputationCount;

    //     // Prnt memory prnt = prnts[prntId];
    //     // curretReputationCount = prnt.reputation;

    //     return curretReputationCount;
    // }    

}
