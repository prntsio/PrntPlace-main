import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import web3 from '../../ethereum/web3';
import Artwork from '../Card';
import PrntNFTFactory from '../../ethereum/PrntNFTFactory';
// import PrntNFTData from '../../ethereum/PrntNFTData';

const Creations = () => {
    const {id} = useParams();

    const [listCreations, setlistCreations] = useState([])

    const refresh = async () => {
        window.location.reload();
    }

    const getCreations = async () => {
        const creations = await PrntNFTFactory.methods.getCreations(id).call();
        console.log(creations);
        const listCreations = creations.map((prnt) => {
            // await getPrnt(address);
            console.log(prnt);
            return (
                <div key={prnt[0]} onClick = {refresh} >
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
        listCreations.reverse();
        setlistCreations(listCreations);
        // console.log(listCreations);
    }

    useEffect(() => {
        getCreations();
    }, [])

    return (
        <div className="grid-style">
            {/* <Artwork title="# Pop Music" username="visualzz" price="0.8ETH" /> */}
            {listCreations}
        </div>
    )
}

export default Creations
