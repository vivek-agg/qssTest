import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LocationList from "./components/LocationList";
import Navbar from "./components/Navbar";
import AddLocation from "./components/AddLocation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact component={AddLocation} path="/addLocation/:id" />
      <Route exact component={AddLocation} path="/addLocation" />
      <Route exact component={LocationList} path="/" />
    </BrowserRouter>
  );
}

export default App;
