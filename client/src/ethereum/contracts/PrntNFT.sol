pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import {ERC721Full} from "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @notice - This is the NFT contract for a prnt
 */
contract PrntNFT is ERC721Full {
    using SafeMath for uint256;
    
    constructor(
        address owner, /// Initial owner (Seller)
        string memory _nftName,
        string memory _nftSymbol,
        string memory _tokenURI, /// [Note]: TokenURI is URL include ipfs hash
        uint256 quantity
    ) public ERC721Full(_nftName, _nftSymbol) {
        for(uint256 tokenId = 1; tokenId <= quantity; tokenId++) {
            mint(owner, tokenId, _tokenURI);
        }
    }
  
    /**
     * @dev mint a prntNFT
     * @dev tokenURI - URL include ipfs hash
     */
    function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool) {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
