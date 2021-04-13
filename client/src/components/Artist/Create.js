import React, {useState} from 'react'
import ReactLoading from 'react-loading';
import "../../css/Create.css";
import web3 from '../../ethereum/web3';
import PrntNFTFactory from '../../ethereum/PrntNFTFactory';

const axios = require("axios");
const FormData = require("form-data");


const Create = ({account}) => {

    const pinataApiKey = "f93140e3bc18599a0b0c";
    const pinataSecretApiKey = "bbe6b854ec4b3d3023597d051bc473200e94edc091fb42d5f793380f02e3b269";

    const [name, setname] = useState("");
    const [symbol, setsymbol] = useState("");
    const [price, setprice] = useState("");
    // const [ipfsHash, setipfsHash] = useState(null);
    const [videoHash, setVideoHash] = useState(null)
    const [imageHash, setImageHash] = useState(null)
    // const [accounts, setaccounts] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [videoUpload, setvideoUpload] = useState(false);
    const [imageUpload, setimageUpload] = useState(false);
    const [selectedVideo, setselectedVideo] = useState(null);
    const [selectedImage, setselectedImage] = useState(null);

    const pinVideoToIPFS = async (e) => {
        e.preventDefault();
        setvideoUpload(true);
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        const data = new FormData();
        data.append("file", selectedVideo);
        // alert("pinning to pinata")
        try{
            // const accounts = await web3.eth.getAccounts();
            // setaccounts(accounts);
            const res = await axios.post(url, data, {
                maxContentLength: "Infinity", 
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey, 
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });
            setVideoHash(res.data.IpfsHash);
            // alert(res.data.IpfsHash)
            setvideoUpload(false);
            console.log(res.data);
        } catch(err){
            console.log(err);
            setvideoUpload(false);
        }
        
    };

    const pinImageToIPFS = async (e) => {
        e.preventDefault();
        setimageUpload(true);
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        const data = new FormData();
        data.append("file", selectedImage);
        // alert("pinning to pinata")
        try{
            // const accounts = await web3.eth.getAccounts();
            // setaccounts(accounts);
            const res = await axios.post(url, data, {
                maxContentLength: "Infinity", 
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey, 
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });
            setImageHash(res.data.IpfsHash);
            // alert(res.data.IpfsHash)
            setimageUpload(false);
            console.log(res.data);
        } catch(err){
            console.log(err);
            setimageUpload(false);
        }
        
    };

    const onCreateNewNFT = async (event) => {
        event.preventDefault();
        setLoading(true);
        try{
            await PrntNFTFactory.methods.createNewPrntNFT(
                name, 
                symbol, 
                web3.utils.toWei(price,'ether'),
                videoHash,
                imageHash
            ).send({
                from: account
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
                <div className="uploads">
                {
                    !videoHash
                    ?
                    (
                        <div className="upload-file">
                            <div className="upload-text">
                                <h3>Upload Video</h3>
                            </div>
                            <div className="choose-file">
                                <form onSubmit={pinVideoToIPFS}>
                                    {/* <input type="file" accept="image/*" onChange={captureFile} /> */}
                                    <input 
                                        type="file" 
                                        accept="video/mp4,video/x-m4v,video/*"
                                        // value={selectedFile || ''}
                                        onChange={(e) => setselectedVideo(e.target.files[0])} 
                                    />
                                    <button type="submit" className="btn">
                                    {
                                        !videoUpload && <span>Upload Video</span>
                                    }   
                                    {
                                        videoUpload && <ReactLoading type={'bubbles'} height={30} width={30} />
                                    } 
                                    </button>
                                </form>
                            </div>
                            
                        </div>
                    )
                    :
                    (
                        <div className="upload-file">
                            <h2 style={{color: "#a3d0d2db"}}>Video Uploaded!</h2>
                            <span>{selectedVideo.name}</span>
                            {/* <h4 style={{marginTop: "40px"}}>Please enter rest details...</h4> */}
                        </div>
                    )
                }
                {
                    !imageHash
                    ?
                    (
                        <div className="upload-file">
                            <div className="upload-text">
                                <h3>Upload Thumbnail</h3>
                            </div>
                            <div className="choose-file">
                                <form onSubmit={pinImageToIPFS}>
                                    {/* <input type="file" accept="image/*" onChange={captureFile} /> */}
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        // value={selectedFile || ''}
                                        onChange={(e) => setselectedImage(e.target.files[0])} 
                                    />
                                    <button type="submit" className="btn">
                                    {
                                        !imageUpload && <span>Upload Cover</span>
                                    }   
                                    {
                                        imageUpload && <ReactLoading type={'bubbles'} height={30} width={30} />
                                    } 
                                    </button>
                                </form>
                            </div>
                            
                        </div>
                    )
                    :
                    (
                        <div className="upload-file">
                            <h2 style={{color: "#a3d0d2db"}}>Cover Uploaded!</h2>
                            <span>{selectedImage.name}</span>
                            {/* <h4 style={{marginTop: "40px"}}>Please enter rest details...</h4> */}
                        </div>
                    )
                }
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
