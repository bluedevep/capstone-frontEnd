import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';


import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faCartShopping, faPenToSquare, faSpinner, faCirclePlus } from "@fortawesome/free-solid-svg-icons";



import Home from "./pages/home";
import EatInOut from "./pages/eat-in-out"; 
import Checkout from "./pages/checkout";
import MenuContainer from "./menu/menu-container";
import NoMatch from "./pages/nomatch";
import Payment from "./pages/payment";
import Completion from "./pages/completion";
import Login from "./menu-management/login"
import MenuManager from "./menu-management/menu-manager"

library.add(faTrash, faSignOutAlt, faCartShopping, faPenToSquare, faSpinner, faCirclePlus);


export default class App extends Component {

  constructor(props) {
    super(props);

  }        

  render() {

    return (
      <div className="container">
        
        <Router>
            <div>              
              <Switch>
                <Route exact path="/" component={Home} />                
                <Route path="/eatin-eatout" component={EatInOut} />                
                <Route path="/menu" component={MenuContainer} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/payment" component={Payment} /> 
                <Route path="/completion" component={Completion} /> 
                <Route path="/login" component={Login} />     
                <Route path="/menu-manager" component={MenuManager} />              
                <Route component={NoMatch} /> 

              </Switch>
            
            </div>
          
        </Router>
        
      </div>
    );
  }
}
