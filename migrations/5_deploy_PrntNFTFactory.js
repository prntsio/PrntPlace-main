const PrntNFTFactory = artifacts.require("./PrntNFTFactory.sol");
const PrntNFTMarketPlace = artifacts.require("./PrntNFTMarketPlace.sol");
const PrntNFTData = artifacts.require("./PrntNFTData.sol");

const _prntNFTMarketPlace = PrntNFTMarketPlace.address;
const _prntNFTData = PrntNFTData.address;

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(PrntNFTFactory, _prntNFTMarketPlace, _prntNFTData);
};
