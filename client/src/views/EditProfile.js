import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import '../components/EditProfile/EditProfile.css';

const axios = require('axios');

const EditProfile = ({ account }) => {
    const [user, setUser] = useState({
        id: account,
        name: '',
        username: '',
        about: '',
    });
    const [Loading, setLoading] = useState(false);

    let history = useHistory();
    const { id } = useParams();

    const getUserData = async () => {
        console.log('id:', id);
        console.log('account:', account);
        try {
            const url_get = `https://prnts-users.herokuapp.com/api/users/${account}`;
            const { data } = await axios.get(url_get);
            let user = {
                id: account,
                name: data.name,
                username: data.username,
                about: data.about,
            };
            setUser(user);
        } catch (err) {}
    };

    useEffect(() => {
        if (account && id !== account) {
            history.push(`/artists/${account}/edit-profile`);
            window.location.reload();
        }
        getUserData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const editUserProfile = async () => {
        setLoading(true);
        try {
            const url_get = `https://prnts-users.herokuapp.com/api/users/${account}`;
            const get_res = await axios.get(url_get);

            const res = await axios.patch(url_get, user);
            console.log(res.data);
        } catch (err) {
            try {
                const url_post = 'https://prnts-users.herokuapp.com/api/users';
                const res = await axios.post(url_post, user);
                console.log(res.data);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        history.push(`/artists/${user.id}`);

        setLoading(false);
    };

    return (
        <div className="edit-profile-container">
            <div className="form-title">
                <h3>Edit Profile</h3>
            </div>
            <div className="fields">
                <div className="detail-field">
                    <div className="nft-name">
                        <input
                            type="text"
                            className="user-input"
                            placeholder="Name"
                            value={user.name}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="nft-symbol">
                        <input
                            type="text"
                            className="user-input"
                            placeholder="@username"
                            value={user.username}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    username: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="nft-description">
                        <input
                            type="text"
                            className="user-input"
                            placeholder="About yourself..."
                            value={user.about}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    about: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <button className="btn save" onClick={editUserProfile}>
                    {Loading ? (
                        <ReactLoading type={'bubbles'} height={30} width={30} />
                    ) : (
                        <h3>Save</h3>
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
