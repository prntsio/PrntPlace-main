import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NotApproved.css';

const axios = require('axios');

const NotApproved = ({ account }) => {
    const [isRequestSent, setIsRequestSent] = useState(false);
    useEffect(() => {
        const getIsRequestSent = async () => {
            const url = `https://prnts-music-nfts.herokuapp.com/api/approvalRequests/${account}`;
            const { data } = await axios.get(url);
            setIsRequestSent(data.isRequestSent);
        };
        getIsRequestSent();
    }, []);
    return (
        <div className="container">
            {isRequestSent ? (
                <div style={{ marginBottom: '20px' }}>
                    We are processing your request...
                </div>
            ) : null}

            <div className="btn approval-request">
                <Link to={`/artists/${account}/request-for-approval`}>
                    <h3>
                        {isRequestSent ? (
                            <span>Edit Request</span>
                        ) : (
                            <span>Send a Approval Request</span>
                        )}
                    </h3>
                </Link>
            </div>
        </div>
    );
};

export default NotApproved;
