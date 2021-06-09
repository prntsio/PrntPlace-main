import web3 from './web3';
import PrntNFTMarketplace from './build/PrntNFTMarketplace.json';

const instance = new web3.eth.Contract(
    PrntNFTMarketplace.abi,
    // '0xed72eDC437dA2fe36Aa9a7174F5E8C0cc3878cab' //single
    // '0xde15CB514205Ac587c07f37bcE64CDcBee74F163' //kovan //multiple
    // '0x0D9aAA2166fCff0c4b7BE29F05BF5011c6E0C165' //rinkeby
    // '0xc948e3470b72b92f5C93Bf600B59682a32Db7370'
    // '0xBE290E5D5E1d9d9d145F5ED65a67e1C807179EC2'
    '0xA55a8F2016dc3b8959435637095C0F85a6640A5D'
);

export default instance;
