import React, { Component } from 'react';
import MenuModal from '../../modals/menu-modal';

export default class BurgerItem extends Component {

  constructor(props){
    super(props);

    this.state = {
      blogModalIsOpen: false,
      cartItems: []

    }
    

    const { id, allergens, category, description, image, is_customizable, name, price, updated_price } = props.item;

    this.id = id;
    this.allergens = allergens;
    this.category = category;
    this.description = description;
    this.image = image;
    this.is_customizable = is_customizable;
    this.name = name;
    this.price = price;
    this.updated_price = updated_price;

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);

    this.addToCart = this.addToCart.bind(this);
  
  }

  handleModalOpen() {
    this.setState({
      blogModalIsOpen: true
    });
  }

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false
    });
  }
  
  //trying to do the cart

  addToCart(cartItem){
    this.props.addingNewCartItems(cartItem);
    console.log("cartItem", cartItem);
  }
  /*
  addToCart = (cartItem) => {
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, cartItem]
    }));

    console.log("cartItem", cartItem);
  }
  */
  
    //allergens, category, description, id, image, is_customizable, name, price, updated_price
  render() {
    return (
      <div className='menu-item-wrapper'>

        <div className='item-image'>
          <img src={this.image} />
        </div>
        
        <div className='menu-item-data'>
          <h1>{this.name}</h1>
          <h1>{this.price}€</h1>
        </div>
        
        <div className='menu-item-buttons'>
          <button className='btn' onClick={this.handleModalOpen}>CUSTOMIZE</button>
          <button className='btn' onClick={this.handleModalOpen}>ADD TO CART</button>
        </div>

        <MenuModal
          item={this.props.item}
          blogModalIsOpen={this.state.blogModalIsOpen}
          handleModalOpen={this.handleModalOpen} 
          handleModalClose={this.handleModalClose}
          addToCart={this.addToCart}
        
        />
      </div>
    );
  }
}
