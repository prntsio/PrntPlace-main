// import web3 from './web3';
import PrntNFTFactory from './build/PrntNFTFactory.json';
import Web3 from 'web3';
import web3 from './web3';

// if(Web3.givenProvider){
//     web3.setProvider()
// }

const instance = new web3.eth.Contract(
    PrntNFTFactory.abi,
    // '0x8A781b81Eea05ec97ac215B38880D5895E6Cf93d' //without return value of create..
    // '0x53C70f2FDb292555A8C429484E53d90d13Eca968' //kovan
    // '0x4B0A5e9Abf51CA331A32d91b6eB18b03730c6ED8' //ropsten
    // '0x0D9aAA2166fCff0c4b7BE29F05BF5011c6E0C165' //ropsten - added openTradewhencreateNewNFT - createNewNFT function not working //open..(address(prntNFT), .. , ..)
    // '0xBe29E7D65F8507FaaCC26504f668754E64002d9c' //ropsten - openTr..(prntNFT, .. , uint prntPrice..)
    // '0xcFdCE7a3514a1d74a8F7BB38B08204dC1e03A53D' //ropsten - openTr..(prntNFT, .. , uint256 prntPrice..)
    // '0x3965f148E7C5fFAc4A09637C1f1A00cb9021C78d' //ropsten - opentrade removed
    // '0x9f6fD2fC252A0f08A02dF2dd2e959Bc2A064e959'
    // '0x6eC04e805286798bdE5bE4878d3e83e2f09C48FF'
    // '0x9142385813bd8C4781dBd7217a394F2300c8890E'
    // '0x22FCf33A712BeeBDa181a39DBdE52f6F468406F3' //kovan
    // '0x10ceC89ecac20979e984799109C399361f3Ae443'
    // '0x050b14B2b81Eb7858C73c4C411dc885b5876097B'
    // '0xD520eDc610863004840d5203df6662316CaC1ef5'
    // '0x47265350C50C9e7649f0b770045872C260fA4d7E'
    // '0xAd3168D7D816cBc652a24D73787F54a38B899b2F'
    // '0xfD91396cc9eC027498c8Be059feE8383A96497f3'
    '0x2623f548483559D26ECE2677BfD4a0CC26C67330'
);

export default instance;