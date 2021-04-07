import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import web3 from '../../ethereum/web3';
import Artwork from '../Card';
import PrntNFTMarketplace from '../../ethereum/PrntNFTMarketplace';
// import PrntNFTData from '../../ethereum/PrntNFTData';

const Collections = () => {
    const {id} = useParams();

    const [listCollections, setlistCollections] = useState([])

    const refresh = async () => {
        window.location.reload();
    }
    
    const getCollections = async () => {
        const collections = await PrntNFTMarketplace.methods.getCollections(id).call();
        // const _prnt = await PrntNFTData.methods.getPrntByNFTAddress()
        console.log(collections);
        const listCollections = collections.map((prnt) => {
            // const len = prnt[3].length;
            console.log(prnt[3]);
            return (
            <div key={prnt[0]} onClick={refresh} >
                {/* {
                    prnt[3][len-1] !== id //here it will be always true sadly :( 
                    ?
                    <p style={{color: "red", margin: "10px 0px"}}>**Previously Owned</p>
                    :
                    null
                } */}
                <Link to={`/music/${prnt[0]}`} >
                    <Artwork 
                        title={`# ${prnt[1]} - ${prnt[2]}`}
                        username={`${prnt[3][0].slice(0,6)}....${prnt[3][0].slice(-7,-1)}`}
                        price={`${web3.utils.fromWei(prnt[4],'ether')} ETH`}
                        imageUrl={`https://ipfs.io/ipfs/${prnt[5]}`}
                    />
                </Link>
            </div>
            );
        });
        listCollections.reverse();
        setlistCollections(listCollections);
    }

    useEffect(() => {
        getCollections();
    }, [])

    return (
        <div className="grid-style">
            {listCollections}
        </div>
    )
}

export default Collections
