import React from 'react';
import { Link } from 'react-router-dom';
import './NotApproved.css';

const NotApproved = ({ account }) => {
    return (
        <div className="container">
            <div className="btn approval-request">
                <Link to={`/artists/${account}/request-for-approval`}>
                    <h3>Send a Approval Request</h3>
                </Link>
            </div>
        </div>
    );
};

export default NotApproved;
