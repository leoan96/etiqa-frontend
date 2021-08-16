import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFreelancer from "./components/add-freelancer.component";
import Freelancer from "./components/freelancer.component";
import FreelancerList from "./components/freelancer-list.component";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/freelancers" className="navbar-brand">
          Complete Developer Network
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/freelancers"} className="nav-link">
              Freelancers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={["/", "/freelancers"]}
            component={FreelancerList}
          />
          <Route exact path="/add" component={AddFreelancer} />
          <Route path="/freelancer/:id" component={Freelancer} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
