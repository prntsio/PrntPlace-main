const PrntNFTMarketplace = artifacts.require("./PrntNFTMarketplace.sol");
const PrntNFTData = artifacts.require("./PrntNFTData.sol");

const _prntNFTData = PrntNFTData.address;

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(PrntNFTMarketplace, _prntNFTData);
};
