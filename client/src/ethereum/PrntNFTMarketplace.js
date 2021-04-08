import web3 from './web3';
import PrntNFTMarketplace from './build/PrntNFTMarketplace.json';

const instance = new web3.eth.Contract(
    PrntNFTMarketplace.abi,
    // '0x3Ab1973e417a7D94933ef0dCeC81da6eE541419E' //kovan
    // '0x74a3F9166F311007086811B1cA469c563eB4D676' //ropsten
    // '0x48039c0c6E330B585077b21F3fB5824A02423a5b'
    // '0xdd91Ca1Ad75D5FbB9024C3Ef31b8d468786E5951'
    // '0x0b2D677D91fe9304bB7e94e2f3b07faC4592dB83'
    // '0x2011fe7D3BA3d70Bc9FdD6ff3Ab7ee6c6D794D97' //kovan
    // '0x5D8E6F960cf78a1B731245024fE405530A25918e'
    // '0xF6D3e82c7153f452495f98f6547B6b4D6aE8042f'
    // '0x2958dF71FD176A976e2697bdc47B839Ecc7FBDCa'
    // '0x4D64AA556b26fcAe24F49B075e676F120401aC29'
    // '0xD321411A27F92da489CF6550Eb2e658985b643A6'
    '0xed72eDC437dA2fe36Aa9a7174F5E8C0cc3878cab'
);

export default instance;