import React, { useState } from "react";
import { Route } from "react-router-dom";
import Contact from "./components/Contact";
import About from "./components/About";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import "./css/index.css";

// Use "yarn build" command to deploy to Netlify

const App = () => {
  // const [savedList, setSavedList] = useState([]);
  // const addToSavedList = movie => {
  //   setSavedList([...savedList, movie]);
  // };

  return (
    <div>
      <Navigation />
      <Route exact path="/" render={props => <Main {...props} />} />
      <Route path="/about" render={props => <About {...props} />} />
      <Route path="/contact" render={props => <Contact {...props} />} />
      {/* <Route
        match
        path="/movies/:id"
        render={props => <Movie {...props} movies={MovieList} />}
      /> */}
    </div>
  );
};

export default App;
