import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LocationList from "./components/LocationList";
import Navbar from "./components/Navbar";
import AddLocation from "./components/AddLocation";
import EditLocation from "./components/EditLocation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <LocationList />
      </Route>
      <Route exact path="/addLocation">
        <AddLocation />
      </Route>
      {/* <Route exact path="/addLocation/:id?">
        <EditLocation />
      </Route> */}
    </BrowserRouter>
  );
}

export default App;
