import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default class SetUpItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      item_ingredients: [],
      ingredients_included: [], 
      ingredients_extra: [],
      ingredients_data:[],
      includedCheckboxState: [],
      extraCheckboxState: [],
      selectedExtraIngredients: [],
      selectedQuantity: 1 
    };

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
  }

  handleAddToCart = () => {
    const selectedIncludedIngredients = this.state.includedIngredientDetails.filter((ingredient, index) => this.state.includedCheckboxState[index]);
    const selectedExtraIngredients = this.state.extraIngredientDetails.filter((ingredient, index) => this.state.extraCheckboxState[index]);

    const cartItem = {
        itemName: this.name,
        itemId: this.id,
        is_customizable: this.is_customizable,
        selectedIncludedIngredients,
        selectedExtraIngredients,
        quantity: this.state.selectedQuantity,
        subtotal: this.calculateSubtotal()
    };

    this.props.addToCart(cartItem);
    this.props.handleModalClose();
    console.log("selectedIncludedIngredients", selectedIncludedIngredients);
    console.log("selectedExtraIngredients", selectedExtraIngredients);
  }

  
  


  handleQuantityChange = (event) => {
    const selectedQuantity = parseInt(event.target.value, 10);
    this.setState({ selectedQuantity });
  }

  componentDidMount() {
    // Cuando el componente se monta, actualiza el state con el item pasado como prop
    this.setState({
      item: this.props.item,
    });
    this.getItemIngredients();
    this.getIngredientsData();
    
  }

  // to do componentwillunmount con a cancel token
  
  getItemIngredients() {
    axios
    .get(`http://127.0.0.1:5000/menu_item_ingredients/${this.id}`)
    .then(response => { 
        console.log("response", response);
        const includedIngredients = response.data.filter(ingredient => ingredient.is_included);
        const extraIngredients = response.data.filter(ingredient => !ingredient.is_included);

        // Obtener los detalles de los ingredientes incluidos
        const includedIngredientDetails = includedIngredients.map(ingredient => {
          const ingredientData = this.state.ingredients_data.find(data => data.id === ingredient.ingredient_id);
          return {
              ingredient_id: ingredient.ingredient_id,
              menu_item_id: ingredient.menu_item_id,
              ingredient_name: ingredientData ? ingredientData.name : 'Unknown'
          };
        });
      
        const extraIngredientDetails = extraIngredients.map(ingredient => {
          const ingredientData = this.state.ingredients_data.find(data => data.id === ingredient.ingredient_id);
          return {
              ingredient_id: ingredient.ingredient_id,
              menu_item_id: ingredient.menu_item_id,
              ingredient_name: ingredientData ? ingredientData.name : 'Unknown'
          };
        });
      
      
        
        this.setState({
          item_ingredients: response.data,
          ingredients_included: includedIngredients,
          ingredients_extra: extraIngredients,
          includedCheckboxState: Array(includedIngredients.length).fill(true),
          extraCheckboxState: Array(extraIngredients.length).fill(false),
          includedIngredientDetails, // Agregar los detalles a los estados
          extraIngredientDetails
        });
    })
    .catch(error => {
        console.log(error);
    });
  }


  //# Endpoint to query all ingredients
  //@app.route("/ingredients", methods=["GET"])

  getIngredientsData() {
    axios
    .get("http://127.0.0.1:5000/ingredients")
    .then(response => { 
      console.log("data", response.data);
      this.setState({
                
        ingredients_data: response.data
      });           

    })
    .catch(error => {
        console.log(error);
    });
  }

  

  //Get los ingredientes de un elemento de menú por su ID
  //@app.route('/menu_item_ingredients/<int:menu_item_id>', methods=["GET"])

  handleExtraIngredientClick = (index) => {
    const newCheckboxState = [...this.state.extraCheckboxState];
    newCheckboxState[index] = !newCheckboxState[index];
    
    const selectedExtraIngredients = this.state.ingredients_extra.filter((ingredient, idx) => newCheckboxState[idx]);

    this.setState({ extraCheckboxState: newCheckboxState, selectedExtraIngredients: selectedExtraIngredients });
  }

  calculateSubtotal = () => {
    const extraIngredientsTotal = this.state.selectedExtraIngredients.reduce((total, ingredient) => {
      const ingredientData = this.state.ingredients_data.find(data => data.id === ingredient.ingredient_id);
      const ingredientPrice = ingredientData ? ingredientData.ingredient_price : 0;
      return total + ingredientPrice;
    }, 0);

    return (this.price + extraIngredientsTotal) * this.state.selectedQuantity;
  }



  render() {
    // Accede a 'item' a través del state
    const { item } = this.state;
    const isCustomizable = this.is_customizable;

    if (!item) {
      return null; // O un mensaje de carga, si es necesario
    }

    const includedIngredients = this.state.ingredients_included || [];
    const extraIngredients = this.state.ingredients_extra || [];
    // Usa la información de 'item' aquí en tu componente SetUpBurger

    return (
      <div className='setup-wrapper'>

        <div className='title'>
          <h1>{this.name}</h1>
        </div>

        <div className='description-image-wrapper'>
          <div className='description'>
            <p>{this.description}</p>
          </div>

          <div className='image'>
            <img src={this.image}></img>
          </div>
        </div>
        
        {isCustomizable && (
            <div>
                <div className='ingredients-included'>
                  <h2>Included Ingredients</h2>
                  {includedIngredients.map((ingredient, index) => {
                    const ingredientData = this.state.ingredients_data.find(data => data.id === ingredient.ingredient_id);
                    const ingredientName = ingredientData ? ingredientData.name : 'Unknown';
                    
                    return (
                      <div key={index}>
                        <input 
                          type="checkbox" 
                          checked={this.state.includedCheckboxState[index]}
                          onChange={() => {
                            const newCheckboxState = [...this.state.includedCheckboxState];
                            newCheckboxState[index] = !newCheckboxState[index];
                            this.setState({ includedCheckboxState: newCheckboxState });
                          }} 
                        />
                        {ingredientName}
                        
                      </div>
                    
                    );
                  })}
                </div>
        


                <div className='ingredients-extra'>
                  <h2>Extra Ingredients</h2>
                  {extraIngredients.map((ingredient, index) => {
                    const ingredientData = this.state.ingredients_data.find(data => data.id === ingredient.ingredient_id);
                    const ingredientName = ingredientData ? ingredientData.name : 'Unknown';
                    const ingredientPrice = ingredientData ? ingredientData.ingredient_price : 0;

                    return (
                      <div key={index}>
                        <input 
                          type="checkbox" 
                          checked={this.state.extraCheckboxState[index]}
                          onChange={() => this.handleExtraIngredientClick(index)}
                        />
                        {ingredientName}
                        <span>+</span>
                        {ingredientPrice}
                      </div>
                    );
                  })}
                </div>
          </div>
        )}

        <div className='buttons-subtotal-wrapper'>
          <div className='subtotal'>
            Subtotal: {this.calculateSubtotal()}
          </div>

          <div className='buttons-wrapper'>
            <button onClick={this.props.handleModalClose}>CANCEL</button>

            <select value={this.state.selectedQuantity} onChange={this.handleQuantityChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                <option key={quantity} value={quantity}>
                  {`× ${quantity}`}
                </option>
              ))}
            </select>
            
            <button className='btn' onClick={this.handleAddToCart}>ADD TO CART <FontAwesomeIcon icon="fa-cart-shopping" /></button>
            
          </div>
          

        </div>



      </div>
      
    );
  }
}