import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from './components/Home';
import Artworks from './components/Artworks';
import Artists from './components/Artists';
import ProfilePage from './components/Artist/ProfilePage';
import Art from './components/Artist/Art';
import Create from './components/Artist/Create';

import "./App.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path = '/' exact component = {Home} />
          <Route path = '/music' exact component = {Artworks} />
          <Route path = '/artists' exact component = {Artists} />
          <Route path = '/music/:id' exact component = {Art} />
          <Route path = '/artists/:id' exact component = {ProfilePage} />
          <Route path = '/create' exact component = {Create} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
