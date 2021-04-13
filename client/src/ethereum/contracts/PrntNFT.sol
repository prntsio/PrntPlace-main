pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import {ERC721Full} from "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @notice - This is the NFT contract for a prnt
 */
contract PrntNFT is ERC721Full {
    using SafeMath for uint256;

    uint256 public currentPrntId;

    constructor(
        address owner, /// Initial owner (Seller)
        string memory _nftName,
        string memory _nftSymbol,
        string memory _tokenURI, /// [Note]: TokenURI is URL include ipfs hash
        uint256 prntPrice
    ) public ERC721Full(_nftName, _nftSymbol) {
        mint(owner, _tokenURI);
    }

    /**
     * @dev mint a prntNFT
     * @dev tokenURI - URL include ipfs hash
     */
    function mint(address to, string memory tokenURI) public returns (bool) {
        /// Mint a new PrntNFT
        uint256 newPrntId = getNextPrntId();
        currentPrntId++;
        _mint(to, newPrntId);
        _setTokenURI(newPrntId, tokenURI);
    }

    ///--------------------------------------
    /// Getter methods
    ///--------------------------------------

    ///--------------------------------------
    /// Private methods
    ///--------------------------------------
    function getNextPrntId() private returns (uint256 nextPrntId) {
        return currentPrntId.add(1);
    }
}
