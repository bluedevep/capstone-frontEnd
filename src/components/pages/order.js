import React, { Component } from "react";
import axios from "axios";

export default class Order extends Component {

  constructor(props){
    super(props);

    this.state = {
      ingredientsData: []
    };
  }

  componentDidMount() {
    
    this.getIngredientsData();
    
  }

  getIngredientName = (ingredient_id) => {
    const ingredientData = this.state.ingredientsData.find(ingredient => ingredient.id === ingredient_id);
    return ingredientData ? ingredientData.name : "Unknown";
  }

  getIngredientsData() {
    axios
    .get("http://127.0.0.1:5000/ingredients")
    .then(response => { 
      console.log("data", response.data);
      this.setState({ ingredientsData: response.data });  

    })
    .catch(error => {
        console.log(error);
    });
  }

  handleCancelOrderClick = () => {
    this.props.history.push({
      pathname: '/home'
    });
  }

  handlePaymentClick = () => {
    const { cartItems, eatInOutStatus } = this.props.location.state;
    this.props.history.push({
      pathname: '/payment',
      state: { cartItems, eatInOutStatus }
    });
  }

  render() {
    const { cartItems, eatInOutStatus } = this.props.location.state;
    const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    return (
      <div className="order-wrapper">
        <div className="top-side">
          <button className='btn' onClick={this.handlePaymentClick}>
            <h1>PAYMENT</h1>
          </button>
        </div>

        <div className="middle-side">
          <div className="left-side">
            <h1>SU PEDIDO</h1>
            {cartItems.map((item, index) => (
              <div key={index}>
                <h2>{item.itemName}</h2>
                <div>
                  <strong>Ingredientes:</strong>
                  <ul>
                    {item.selectedExtraIngredients.map((ingredient, i) => (
                      <li key={i}>
                        {this.getIngredientName(ingredient.ingredient_id)}
                      </li>
                    ))}
                    {item.selectedIncludedIngredients.map((ingredient, i) => (
                      <li key={i}>
                        {this.getIngredientName(ingredient.ingredient_id)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>Cantidad: {item.quantity}</div>
                <div>Subtotal: {item.subtotal.toFixed(2)} €</div>
              </div>
            ))}
          </div>

          <div className="right-side">
            <h1>RESUMEN</h1>
            <div className="billing-details">
              <div>TOTAL SIN IVA {total.toFixed(2)} €</div>
              <div>10% IVA {(total * 0.1).toFixed(2)} €</div>
              <div>TOTAL {(total * 1.1).toFixed(2)} €</div>
            </div>
          </div>
        </div>

        <div className="botton-side">
          <button className='btn' onClick={this.handleCancelOrderClick}>
            <h1>CANCEL ORDER</h1>
          </button>
        </div>
      </div>
    );
  }
}
