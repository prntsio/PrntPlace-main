import web3 from './web3';
import PrntNFTData from './build/PrntNFTData.json';

const instance = new web3.eth.Contract(
    PrntNFTData.abi,
    // '0x1Ee72e582F2167e30EC41d9C82f7829bA1C65627' //kovan
    // '0x5de6A918aBE8Ab805D03EbE444de5CdaA652D43c' //ropsten
    '0xc948e3470b72b92f5C93Bf600B59682a32Db7370' //trades mapping (prntNFT => Trade)
);

export default instance;