pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import { SafeMath } from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/math/SafeMath.sol";
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
    // PrntNFTData.Prnt[] public _prnts;
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
    function createNewPrntNFT(string memory nftName, string memory nftSymbol, uint prntPrice, string memory ipfsHashOfPrnt) public returns (bool) {
        address owner = msg.sender;  /// [Note]: Initial owner of prntNFT is msg.sender
        string memory tokenURI = getTokenURI(ipfsHashOfPrnt);  /// [Note]: IPFS hash + URL
        PrntNFT prntNFT = new PrntNFT(owner, nftName, nftSymbol, tokenURI, prntPrice);
        prntAddresses.push(address(prntNFT));
        
        
        // creations[owner] = 
        
        // creations[owner].push(prntNFT);
        // prntNFTMarketplace.saveCreationsAddress(owner,creations[owner]);
        
        /// Save metadata of a prntNFT created
        prntNFTData.saveMetadataOfPrntNFT(prntAddresses, prntNFT, nftName, nftSymbol, msg.sender, prntPrice, ipfsHashOfPrnt);
        prntNFTData.updateStatus(prntNFT, "Open");
        
        PrntNFTData.Prnt memory prnt = prntNFTData.getPrntByNFTAddress(prntNFT);
        creations[owner].push(prnt);
        
        prntNFTData.addArtist(msg.sender);

        emit PrntNFTCreated(msg.sender, prntNFT, nftName, nftSymbol, prntPrice, ipfsHashOfPrnt);
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
