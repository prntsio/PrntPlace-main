import React, {useState} from 'react'
import ReactLoading from 'react-loading';
import "../../css/Create.css";
import web3 from '../../ethereum/web3';
import ipfs from '../../ethereum/ipfs';
import PrntNFTFactory from '../../ethereum/PrntNFTFactory';

const Create = () => {
    const [name, setname] = useState("");
    const [symbol, setsymbol] = useState("");
    const [price, setprice] = useState("");
    const [ipfsHash, setipfsHash] = useState(null);
    const [buffer, setbuffer] = useState('');
    const [accounts, setaccounts] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [Upload, setUpload] = useState(false);
    const [fileName, setFileName] = useState("");

    const captureFile = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const file = e.target.files[0]
        console.log(file);
        setFileName(file.name)
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
        setUpload(true);
       
        const accounts = await web3.eth.getAccounts();
        setaccounts(accounts);
    
        console.log('Sending from Metamask account: ' + accounts[0]);
        
        await ipfs.files.add(buffer, (err, result) => {
            if(err){
                console.log(err);
                setUpload(false);
                alert("Problem uploading files..", err)
                window.location.reload();
                return
            }
            setUpload(false);
            // alert("NFT Created(Hash Value): " + result[0].hash);
            setipfsHash(result[0].hash);
            console.log(ipfsHash);
        })
    }

    const onCreateNewNFT = async (event) => {
        event.preventDefault();
        setLoading(true);
        try{
            await PrntNFTFactory.methods.createNewPrntNFT(
                name, 
                symbol, 
                web3.utils.toWei(price,'ether'),
                ipfsHash
            ).send({
                from: accounts[0]
            });
            setLoading(false);
            // alert("NFT minted successfully!")
            window.location.reload();
        } catch(err) {
            console.log(err);
            setLoading(false);
            alert ("Enter values correctly.",err)
        }
    }

    return (
        <div className="full-details">
            <div className="upload-box">
                <h2 style={{margin: "10px 50px 10px 50px"}}>Create NFTS</h2>

                {
                    !ipfsHash
                    ?
                    (
                        <div className="upload-file">
                            <div className="upload-text">
                                <h3>Upload File</h3>
                            </div>
                            <div className="choose-file">
                                <form onSubmit={onSendIpfs}>
                                    <input type="file" accept="image/*" onChange={captureFile} />
                                    <button type="submit" className="btn" disabled={Upload} >
                                    {
                                        !Upload && <span>Upload</span>
                                    }   
                                    {
                                        Upload && <ReactLoading type={'bubbles'} height={30} width={30} />
                                    } 
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="upload-file">
                            <h1 style={{color: "#25ef25db"}}>File Uploaded!</h1>
                            <span>{fileName}</span>
                            <h4 style={{marginTop: "40px"}}>Please enter rest details...</h4>
                        </div>
                    )
                }
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
                    <button type="submit" className="btn" disabled={Loading} >
                    {
                        Loading && <ReactLoading type={'bubbles'} height={30} width={30} />
                    }
                    {
                        !Loading && <span>Create</span>
                    }           
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Create
