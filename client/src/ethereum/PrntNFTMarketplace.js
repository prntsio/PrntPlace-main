import web3 from './web3';
import PrntNFTMarketplace from './build/PrntNFTMarketplace.json';

const instance = new web3.eth.Contract(
    PrntNFTMarketplace.abi,
    // '0x3Ab1973e417a7D94933ef0dCeC81da6eE541419E' //kovan
    // '0x74a3F9166F311007086811B1cA469c563eB4D676' //ropsten
    '0x48039c0c6E330B585077b21F3fB5824A02423a5b'
);

export default instance;