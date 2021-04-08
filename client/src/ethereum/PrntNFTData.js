import web3 from './web3';
import PrntNFTData from './build/PrntNFTData.json';

const instance = new web3.eth.Contract(
    PrntNFTData.abi,
    // '0x1Ee72e582F2167e30EC41d9C82f7829bA1C65627' //kovan
    // '0x5de6A918aBE8Ab805D03EbE444de5CdaA652D43c' //ropsten
    // '0xc948e3470b72b92f5C93Bf600B59682a32Db7370' //trades mapping (prntNFT => Trade)
    // '0xc829194393a17E03412Fb78903c4FFE596a01D39' //ownerAddress[]
    // '0xA55a8F2016dc3b8959435637095C0F85a6640A5D'
    // '0xEE300ddCe94c26F7DB5c7066354000126490Dac2' //kovan
    // '0x7Cb07737ddd71f0481B9E251b0593cA0bDCc2c64'
    // '0x8a75dE3283daDc2046a0De52435a8a6bd4577C5B'
    // '0xaD480891894c7b01F47198C11E0e77738EF948f0'
    // '0x93e36D6e7897C332bBe1402a5A34acb234b3af5F' //artists not added yet
    // '0x240dCc57cb3e7443eAd1A446Db97974F92DA342a'
    '0xf8bbaDaa46570b033f753922757516b785fc5e63'

);

export default instance;