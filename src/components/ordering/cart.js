import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class Cart extends Component {

  constructor(props){
    super(props);
    
    this.state={
      total : 0
    }

    // props -> cartItems={this.state.cartItems} 
    //props -> eatInOutStatus={this.state.eatInOutStatus}
  }

  handlePaymentClick = () => {
    const { cartItems, eatInOutStatus } = this.props;
    this.props.history.push({
      pathname: '/checkout',
      state: { cartItems, eatInOutStatus }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems) {
      const total = this.calculateTotal(this.props.cartItems);
      this.setState({ total });
    }
  }
  
  calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.subtotal;
    });
    return total;
  }
  

  render() {
    return (
      <div className='cart-component'>
    
        <div className='eatStatus'>
          {this.props.eatInOutStatus === "EAT_IN" ? <div><h1>You are ordering for EATING IN</h1></div> : <div><h1>You are ordering for EATING OUT</h1></div>}
        </div>

        <div className='total-edit-wrapper'>

          <div><h1>Total: {this.state.total.toFixed(2)} €</h1></div>
          { /*
          <div>
            <Link to="/order" className='edit-link'>
              Editar Pedido *TO DO : QUE SEA EDITABLE Y NO SOLO VERLO
            </Link>
          </div>
          */ }
        </div>
          

        <div className='btn-payment'>
          {this.state.total > 0 ? ( 
           
            <button className='btn' onClick={this.handlePaymentClick}>
              <h1>CHECKOUT</h1>
            </button>
            
          ): null}
        </div>
        
      </div>
    );
  }
}

export default withRouter(Cart);