import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Completion extends Component {
  render() {
    return (
        <div className='completion container'>
            <div className='content'>
                <h1>You have succesfully completed the payment</h1>
                <h1>Your order will be ready soon</h1>

                
                <Link to="/" className="btn start-button">Start</Link>
            </div>

            
      </div>
    );
  }
}