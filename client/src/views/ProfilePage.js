import React, { useState, useEffect } from 'react';
import {
    BrowserRouter,
    Link,
    NavLink,
    Route,
    Switch,
    useParams,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Profile from '../components/ProfilePage/Profile';
import About from '../components/ProfilePage/About';
import Creations from '../components/ProfilePage/Creations';
import Collections from '../components/ProfilePage/Collections';
import Nav from '../components/ProfilePage/Nav';
import '../components/ProfilePage/ProfilePage.css';

const axios = require('axios');

const ProfilePage = ({ account, isMobile }) => {
    const [user, setUser] = useState({ name: '', username: '', about: '' });
    const { id } = useParams();

    const getUserData = async () => {
        const url = `https://prnts-music-nfts.herokuapp.com/api/users/${id}`;
        const res = await axios.get(url);
        setUser(res.data);
    };

    useEffect(() => {
        getUserData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const refresh = async () => {
    //     window.location.reload();
    // };

    return (
        <>
            {/* <div> */}
            {account === id ? (
                // <div onClick={refresh}>
                <div>
                    <Link
                        exact
                        to={`/artists/${id}/edit-profile`}
                        className="btn edit-profile"
                    >
                        {isMobile ? (
                            <h5>Edit Profile</h5>
                        ) : (
                            <h3>Edit Profile</h3>
                        )}
                    </Link>
                </div>
            ) : null}
            <BrowserRouter history={createBrowserHistory}>
                <Profile
                    name={user.name}
                    username={user.username}
                    ethAddress={id}
                />
                <div className="creations-collections">
                    <Nav id={id} isMobile={isMobile} />
                    <Switch>
                        <Route
                            path="/artists/:id"
                            exact
                            component={Creations}
                        />
                        <Route
                            path="/artists/:id/collections"
                            exact
                            component={Collections}
                        />
                    </Switch>
                </div>
                {user.about && (
                    <>
                        <h3 style={{ margin: '20px 20px 5px 25px' }}>About</h3>
                        <About about={user.about} />
                    </>
                )}
                {/* </div> */}
            </BrowserRouter>
        </>
    );
};

export default ProfilePage;
