
/* NOTE: NewsAPI free developer account now only accepts CORS requests from localhost....
API won't fetch while site hosted on netlify
so now project codebase using Gnews free instead. */

// App.js



















import React from "react";

import NavBar2 from './Components/Navbar2';

import NavBar1 from "./Components/Navbar1";

import News from "./Components/News";


import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
         <NavBar1 />
          <NavBar2 />

          <div className="container">
            <div className="row">
              <div className="col-md">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <News key="general"
                      category="general" />}
                  />
                  <Route
                    path="/Entertainment"
                    element={
                      <News key="entertainment"
                      category="entertainment" />
                    }
                  />
                  <Route
                    path="/Technology"
                    element={
                      <News key="technology"
                      category="technology" />}
                  />
                  <Route
                    path="/Sports"
                    element={
                      <News key="sports"
                      category="sports" />}
                  />
                  <Route
                    path="/Business"
                    element={
                      <News key="business"
                      category="business" />}
                  />
                  <Route
                    path="/Health"
                    element={
                      <News key="health"
                      category="health" />}
                  />
                  <Route
                    path="/Science"
                    element={
                      <News key="science"
                      category="science" />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

  
