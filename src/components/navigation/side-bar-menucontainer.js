import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SidebarComponent extends Component {
  scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return (
      <div className="sidebar">
        <button className="btn" style={{ height: '200px' }} onClick={() => this.scrollToSection('burgers')}>
          <h1>BURGERS</h1>
        </button>
        <button className="btn" style={{ height: '200px' }} onClick={() => this.scrollToSection('baguettes')}>
          <h1>BAGUETTES</h1>
        </button>
        <button className="btn" style={{ height: '200px' }} onClick={() => this.scrollToSection('snacks')}>
          <h1>SNACKS</h1>
        </button>
        <button className="btn" style={{ height: '200px' }} onClick={() => this.scrollToSection('drinks')}>
          <h1>DRINKS</h1>
        </button>
        <button className="btn" style={{ height: '200px' }} onClick={() => this.scrollToSection('desserts')}>
          <h1>DESSERTS</h1>
        </button>
      </div>
    );
  }
}

export default withRouter(SidebarComponent);
