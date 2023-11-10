import React, { Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './checkout-form';



//my clave publica en loadStripe STRIPE_PUBLIC_KEY

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clientSecret: null,
      stripePromise: loadStripe('pk_test_51O8LOXDOr1batTyws1KNgjuMBdAVPBNVVqypEogMamG5Ho5kiVLdYNMikpRxvpZPHzg39sgLjnKg87YBSEDThiK600YpaiIneN')
    };
  }

  

  //to get the client secret
  componentDidMount(){

    const { cartItems, eatInOutStatus } = this.props.location.state;
    const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    fetch("http://127.0.0.1:5000/stripe/secret/" + total)
      .then((res) => res.json())
      .then(({client_secret}) => this.setState({clientSecret: client_secret}));

      

  }

  render() {

    
    const options = {
      // passing the client secret obtained from the server
      clientSecret: this.state.clientSecret,
    }

    return (
      <div>
        <h1>Payment</h1>

        {this.state.clientSecret && (
        
          <Elements stripe={this.state.stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      

      </div>
      
    );
  }
}

