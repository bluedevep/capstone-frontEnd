import React, { Component } from "react";
import { NavLink } from "react-router-dom";


export default class NavigationComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="nav-logo-wrapper">

        <div className='logo'>
            <img src="https://images2.imgbox.com/1f/e6/MsVcOcJd_o.png" style={{ height: '200px' }} alt="logo" />
        </div>
        
        <div className="nav-links-wrapper">
          <a href="https://fangalokastyle.com/">Fangaloka Web</a>
        </div>

      </div>
    );
  }
}