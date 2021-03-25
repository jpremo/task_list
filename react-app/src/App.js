import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <HomePage/>
        </Route>
        <Route path="/" exact={false}>
          <div>Page not found</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
