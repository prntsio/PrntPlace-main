import React from 'react';
import Body from '../components/Home/Body';
import Artworks from './Artworks';
import '../components/Home/Home.css';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
`;

const Home = () => {
    return (
        <div>
            <Body />
            {/* <hr
                style={{
                    color: 'black',
                    height: '30',
                    margin: '10px 30px',
                }}
            /> */}
            <Container>
                <span className="gradient-underline">Featured</span>
                <Artworks />
            </Container>
        </div>
    );
};

export default Home;
