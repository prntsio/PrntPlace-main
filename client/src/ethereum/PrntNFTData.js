import web3 from './web3';
import PrntNFTData from './build/PrntNFTData.json';

const instance = new web3.eth.Contract(
    PrntNFTData.abi,
    // '0xf8bbaDaa46570b033f753922757516b785fc5e63'
    // '0x3A22b0B805EbeCdd5a4A66352979A505fe1348D0'
    // '0x55b9eE9C647eCE7d86C9B90a0209C14a5f802eea'
    // '0x021a4474139Aa2E008d9A73ce56D58433c76fdB7'
    // '0xB4A1faB075DD1881Eda6057F2660e67B683Ac810'
    '0x66Ff614aF38a8F698F7E7Dc691EE3360bF0a4cb7'
);

export default instance;
