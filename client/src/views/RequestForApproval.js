import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
const axios = require('axios');

const Container = styled.div`
    margin: auto;
    margin-top: 8vh;
    display: grid;
    align-items: center;
    justify-items: center;
    justify-content: center;
    box-shadow: inset 5px 5px 12px #dbe1e2, inset -5px -5px 12px #f7fdfe;
    width: fit-content;
    padding: 30px 5vw;
    border-radius: 30px;
`;

const Form = styled.form`
    margin-top: 40px;
    display: grid;
    justify-items: center;
`;

const Input = styled.input`
    font-family: 'Poppins';
    font-weight: bold;
    font-size: 16px;
    width: 350px;
    background: #e9eff0;
    box-shadow: inset 5px 5px 12px #dbe1e2, inset -5px -5px 12px #f7fdfe;
    border: none;
    border-radius: 50px;
    outline: none;
    padding: 10px 10px 10px 20px;
    margin: 10px 0px;
`;

const TextArea = styled.textarea`
    font-family: 'Poppins';
    font-weight: bold;
    font-size: 16px;
    width: 350px;
    height: 200px;
    background: #e9eff0;
    box-shadow: inset 5px 5px 12px #dbe1e2, inset -5px -5px 12px #f7fdfe;
    border: none;
    border-radius: 20px;
    outline: none;
    padding: 10px 10px 10px 20px;
    margin: 10px 0px;
`;

const RequestForApproval = ({ account }) => {
    const [links, setLinks] = useState({
        twitter: '',
        instagram: '',
        email: '',
        website: '',
        other: '',
    });
    const [description, setDescription] = useState('');
    const [Loading, setLoading] = useState(false);

    let history = useHistory();

    const sendApprovalRequest = async () => {
        setLoading(true);
        const url = 'http://192.168.100.13:5000/api/approvalRequests';
        const ApprovalRequest = {
            id: account,
            links,
            description,
        };
        try {
            const res = await axios.post(url, ApprovalRequest);
            console.log(res.data);
        } catch (err) {
            console.log(err);
            setLoading(false);
            return;
        }
        history.push('/music');
    };

    return (
        <Container>
            <h2>Request for Approval</h2>
            <Form>
                <Input
                    type="text"
                    placeholder="Twitter"
                    value={links.twitter}
                    onChange={(e) =>
                        setLinks({
                            ...links,
                            twitter: e.target.value,
                        })
                    }
                />
                <Input
                    type="text"
                    placeholder="Instagram"
                    value={links.instagram}
                    onChange={(e) =>
                        setLinks({
                            ...links,
                            instagram: e.target.value,
                        })
                    }
                />
                <Input
                    type="text"
                    placeholder="Email"
                    required
                    value={links.email}
                    onChange={(e) =>
                        setLinks({
                            ...links,
                            email: e.target.value,
                        })
                    }
                />
                <Input
                    type="text"
                    placeholder="Website"
                    value={links.website}
                    onChange={(e) =>
                        setLinks({
                            ...links,
                            website: e.target.value,
                        })
                    }
                />
                <Input
                    type="text"
                    placeholder="Other"
                    value={links.other}
                    onChange={(e) =>
                        setLinks({
                            ...links,
                            other: e.target.value,
                        })
                    }
                />
                <TextArea
                    type="text"
                    // cols="100"
                    // rows="5"
                    wrap="true"
                    maxLength={1000}
                    required
                    placeholder="What do you intend to do?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="btn" onClick={sendApprovalRequest}>
                    {Loading ? (
                        <ReactLoading type={'bubbles'} height={30} width={30} />
                    ) : (
                        <h3>Send</h3>
                    )}
                </button>
            </Form>
        </Container>
    );
};

export default RequestForApproval;
