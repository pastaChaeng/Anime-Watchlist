// Import necessary dependencies
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topairing from "./components/Topairing";
import VideoPage from "./components/VideoPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Topairing} />
        <Route path="/video/:animeId" component={VideoPage} />
      </Switch>
    </Router>
  );
}

export default App;
