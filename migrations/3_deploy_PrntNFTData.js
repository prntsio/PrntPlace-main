const PrntNFTData = artifacts.require("./PrntNFTData.sol");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(PrntNFTData);
};
