pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { Strings } from "./Strings.sol";
import { PrntNFTFactoryStorages } from "./PrntNFTFactoryStorages.sol";
import { PrntNFT } from "./PrntNFT.sol";
import { PrntNFTMarketplace } from "./PrntNFTMarketPlace.sol";
import { PrntNFTData } from "./PrntNFTData.sol";

/**
 * @notice - This is the factory contract for a NFT of prnt
 */
contract PrntNFTFactory is PrntNFTFactoryStorages {
    using SafeMath for uint256;
    using Strings for string;    

    address[] public prntAddresses;
    mapping(address => PrntNFTData.Prnt[]) creations;
    address PRNT_NFT_MARKETPLACE;

    PrntNFTMarketplace public prntNFTMarketplace;
    PrntNFTData public prntNFTData;

    constructor(PrntNFTMarketplace _prntNFTMarketplace, PrntNFTData _prntNFTData) public {
        prntNFTMarketplace = _prntNFTMarketplace;
        prntNFTData = _prntNFTData;
        PRNT_NFT_MARKETPLACE = address(prntNFTMarketplace);
    }

    /**
     * @notice - Create a new prntNFT when a seller (owner) upload a prnt onto IPFS
     */
    function createNewPrntNFT(string memory nftName, string memory nftSymbol, string memory tokenURI, uint prntPrice, uint quantity, uint256 royalties) public {
        address owner = msg.sender;  /// [Note]: Initial owner of prntNFT is msg.sender - creator
        tokenURI = getTokenURI(tokenURI);  /// [Note]: IPFS hash + URL
        PrntNFT prntNFT = new PrntNFT(owner, nftName, nftSymbol, tokenURI, quantity);
        prntAddresses.push(address(prntNFT));
        
        /// Save metadata of a prntNFT created
        prntNFTData.saveMetadataOfPrntNFT(prntAddresses, prntNFT, tokenURI, quantity, msg.sender, prntPrice, royalties);
        
        PrntNFTData.Prnt memory prnt = prntNFTData.getPrntByNFTAddress(prntNFT);
        creations[owner].push(prnt);
        
        prntNFTData.addArtist(msg.sender);

        emit PrntNFTCreated(msg.sender, prntNFT, nftName, nftSymbol, prntPrice, tokenURI);
    }
    
    function getCreations(address owner) public view returns (PrntNFTData.Prnt[] memory) {
        return creations[owner];
    }


    ///-----------------
    /// Getter methods
    ///-----------------
    function baseTokenURI() public pure returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function getTokenURI(string memory _ipfsHashOfPrnt) public view returns (string memory) {
        return Strings.strConcat(baseTokenURI(), _ipfsHashOfPrnt);
    }

}
