import React, { Component } from "react";
import CreateUser from "./CreateUser";
import Login from "./Login";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import ItemList from "./ItemList";
import ItemPage from "./ItemPage";
import CartList from "./CartList";
import SellItem from "./SellItem";
import SellItemPage from "./SellItemPage";
import SellEdit from "./SellEdit";

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Navbar></Navbar>
          <div>
            <Switch>
              <Route exact path="/create" component={CreateUser}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/dashboard" component={Dashboard}></Route>
              <Route exact path="/" component={ItemList}></Route>
              <Route exact path="/item/:id" component={ItemPage}></Route>
              <Route exact path="/cart" component={CartList}></Route>
              <Route exact path="/sell" component={SellItemPage}></Route>
              <Route exact path="/sell/create" component={SellItem}></Route>
              <Route exact path="/sell/edit/:id" component={SellEdit}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
