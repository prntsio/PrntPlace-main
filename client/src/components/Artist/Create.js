import React, {useState} from 'react'
import "../../css/Create.css";
import web3 from '../../ethereum/web3';
import ipfs from '../../ethereum/ipfs';
import PrntNFTFactory from '../../ethereum/PrntNFTFactory';
import PrntNFT from '../../ethereum/build/PrntNFT.json';

const Create = () => {
    //QmdVNMtnpT2DennGSKcwqpriU7t84kAfwXEcdBc74uryBi
    const [name, setname] = useState("")
    const [symbol, setsymbol] = useState("")
    const [price, setprice] = useState("")
    const [ipfsHash, setipfsHash] = useState(null);
    const [buffer, setbuffer] = useState('');
    const [accounts, setaccounts] = useState([])

    const captureFile = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const file = e.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => convertToBuffer(reader)
    };

    const convertToBuffer = async (reader) => {
        const buffer = await Buffer.from(reader.result);
        // this.setState({buffer});
        setbuffer(buffer)
        console.log(buffer);
    };

    const onSendIpfs = async (e) => {
        e.preventDefault();
        const accounts = await web3.eth.getAccounts();
        setaccounts(accounts);
       
        // ipfsHash = ipfsHash;
        console.log('Sending from Metamask account: ' + accounts[0]);
        console.log(ipfsHash);
        await ipfs.files.add(buffer, (err, result) => {
            if(err){
                console.error(err);
                return
            }
            alert("NFT Created(Hash Value): " + result[0].hash);
            console.log(err,ipfsHash);
            //   this.setState({ ipfsHash:ipfsHash[0].hash });
            setipfsHash(result[0].hash)
        }) 
    }; 

    const onCreateNewNFT = async (event) => {
        event.preventDefault();
        try{
            const PRNT_NFT_MARKETPLACE = await PrntNFTFactory.methods.prntNFTMarketplace().call();
            // console.log(PRNT_NFT_MARKETPLACE);

            const prntNFT = await PrntNFTFactory.methods.createNewPrntNFT(
                name, 
                symbol, 
                web3.utils.toWei(price,'ether'),
                ipfsHash
            ).send({
                from: accounts[0]
            });
            console.log(prntNFT)
            alert("You need to give approval to the contract for life time concerns for the trading of your NFT.")
            
            const instance = new web3.eth.Contract(
                PrntNFT.abi,
                prntNFT.events[0].address
            );

            await instance.methods.setApprovalForAll(
                PRNT_NFT_MARKETPLACE,
                true
            ).send({
                from: accounts[0]
            });

            alert("NFT minted successfully and NFT marketplace approved to handle owner stuffs.!")
        } catch(err) {
            console.log(err);
            alert ("Enter values correctly.")
        }
    }

    return (
        <div className="full-details">
            <div className="upload-box">
                <h2 style={{margin: "10px 50px 10px 50px"}}>Mint NFTS</h2>
                <div className="upload-file">
                    <div className="upload-text">
                        <h3>Upload File</h3>
                    </div>
                    <div className="choose-file">
                        <form onSubmit={onSendIpfs}>
                            <input type="file" onChange={captureFile} />
                            <button type="submit" className="btn">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="nft-details">
                <form onSubmit={onCreateNewNFT} >
                    <h2>NFT name </h2>
                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                    <h2>NFT Symbol</h2>
                    <input type="text" value={symbol} onChange={(e) => setsymbol(e.target.value)}/>
                    <h2>Price</h2>
                    <input type="text" value={price} onChange={(e) => setprice(e.target.value)} />
                    <br/>
                    <button type="submit" className="btn" >Mint</button>
                </form>
            </div>
        </div>
    )
}

export default Create
