import web3 from './web3';
import PrntNFTFactory from './build/PrntNFTFactory.json';

const instance = new web3.eth.Contract(
    PrntNFTFactory.abi,
    // '0x8A781b81Eea05ec97ac215B38880D5895E6Cf93d' //without return value of create..
    // '0x53C70f2FDb292555A8C429484E53d90d13Eca968' //kovan
    // '0x4B0A5e9Abf51CA331A32d91b6eB18b03730c6ED8' //ropsten
    // '0x0D9aAA2166fCff0c4b7BE29F05BF5011c6E0C165' //ropsten - added openTradewhencreateNewNFT - createNewNFT function not working //open..(address(prntNFT), .. , ..)
    // '0xBe29E7D65F8507FaaCC26504f668754E64002d9c' //ropsten - openTr..(prntNFT, .. , uint prntPrice..)
    // '0xcFdCE7a3514a1d74a8F7BB38B08204dC1e03A53D' //ropsten - openTr..(prntNFT, .. , uint256 prntPrice..)
    // '0x3965f148E7C5fFAc4A09637C1f1A00cb9021C78d' //ropsten - opentrade removed
    '0x9f6fD2fC252A0f08A02dF2dd2e959Bc2A064e959'
);

export default instance;