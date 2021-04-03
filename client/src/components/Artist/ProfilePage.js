import React from 'react'
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import Profile from './Profile';
import About from './About';
import Creations from './Creations';
import Collections from './Collections';
import Nav from '../Artist/Nav';
import "../../css/ProfilePage.css";

const ProfilePage = () => {
    const {id} = useParams();
    return (
        <BrowserRouter>
        <div >
            <Profile ethAddress={id} />
            <div className="creations-collections">
                <Nav />
                <Switch>
                    <Route path='/artists/:id' exact component={Creations} />
                    <Route path='/artists/:id/collections' exact component={Collections} />
                </Switch>
            </div>
            <h3 style={{margin: "20px 20px 5px 25px"}}>About</h3>
            {/* <hr 
                style={{
                    margin: "10px 20px",
                    color: 'black',
                    height: "20"
                }}
            /> */}
            <About />
        </div>
        </BrowserRouter>
    )
}

export default ProfilePage
