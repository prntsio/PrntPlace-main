import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Card from './Card';
// import web3 from '../ethereum/web3';
// import PrntNFT from '../ethereum/PrntNFT';
import web3 from '../ethereum/web3';
import PrntNFTData from '../ethereum/PrntNFTData';

const Artworks = () => {
    const [listItems, setlistItems] = useState(null);
    
    const listArtworks = async () => {
        const list = await PrntNFTData.methods.getAllPrnts().call();
        console.log(list);
        const listitems =  list.map((items) => {
            if(items[5] === "QmasmgDBqsM58pC7UBo8DeMvhpXsBfhU1dt55aM7XcioKo") return null
                
            if(items[5] === "0xBe29E7D65F8507FaaCC26504f668754E64002d9c") return null
                
            return  (
                <div key={items[5]} >
                    <Link to={`/music/${items[0]}`} >
                        <Card 
                            title={`# ${items[1]} - ${items[2]}`}
                            username={`${items[3].slice(0,6)}....${items[3].slice(-7,-1)}`}
                            price={`${web3.utils.fromWei(items[4],'ether')} ETH`}
                            imageUrl={`https://ipfs.io/ipfs/${items[5]}`}
                        />
                    </Link>
                </div>
            );
        })
        
        setlistItems(listitems)
    }

    useEffect(() => {
        listArtworks();

        return () => {
            //cleanup
        }
    }, []) //on mount
    
    return (
        <div>
            <div className="grid-style">
                {listItems}
            </div>
        </div>
    )
}

export default Artworks
