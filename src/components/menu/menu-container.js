import React, { Component } from "react";
import axios from "axios";
import Cart from '../ordering/cart';
import BurgerItem from "./menu-items/burger-item";
import BaguetteItem from "./menu-items/baguette-item";
import SnackItem from "./menu-items/snack-item";
import DrinkItem from "./menu-items/drink-item";
import DessertItem from "./menu-items/dessert-item";
import SidebarComponent from "../navigation/side-bar-menucontainer";

export default class MenuContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Fangaloka Menu",
            isLoading: false,
            data: [], 
            burgersData:[],
            baguettesData:[],
            snacksData: [],
            drinksData:[],
            dessertsData:[],
            cartItems: [],
            eatInOutStatus: ""
        };

        this.addingNewCartItems = this.addingNewCartItems.bind(this);
        
    }

    storeCartItems= () => {
        const cart=this.state.cartItems;
        localStorage.getItem('cart', JSON.stringify(cart));

    }

    addingNewCartItems(cartItem){
        this.setState({
            cartItems: [cartItem].concat(this.state.cartItems)
        });

        this.storeCartItems();
        
    }

    getMenuItems() {
        axios
        .get("https://fangaloka-db-b7b295303892.herokuapp.com/items")
        .then(response => { 
            console.log("response getMenuItems", response.data);           
            this.setState({
                data: response.data
            });

            this.getBurgersData();
            this.getBaguettesData();
            this.getSnacksData();
            this.getDrinksData();
            this.getDessertsData();
            
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    componentDidMount(){
        this.getMenuItems();
        
        const eatInOutStatus = this.props.location.state.eatInOutStatus;
        this.setState({ eatInOutStatus });       
    }

    
    
    getBurgersData() {
        this.setState({
            burgersData: this.state.data.filter(item => {
                return item.category === "burger";
            })
        });
    }

    getBaguettesData() {
        this.setState({
            baguettesData: this.state.data.filter(item => {
                return item.category === "baguette";
            })
        });
    }

    getSnacksData() {
        this.setState({
            snacksData: this.state.data.filter(item => {
                return item.category === "snack";
            })
        });
    }

    getDrinksData() {
        this.setState({
            drinksData: this.state.data.filter(item => {
                return item.category === "drink";
            })
        });
    }

    getDessertsData() {
        this.setState({
            dessertsData: this.state.data.filter(item => {
                return item.category === "dessert";
            })
        });
    }

    burgerItems() {
    
        return this.state.burgersData.map(item => {
            
            return <BurgerItem key={item.id} item={item} addingNewCartItems={this.addingNewCartItems} /> ;
            
        });
    }

    baguetteItems() {
    
        return this.state.baguettesData.map(item => {
            
            return <BaguetteItem key={item.id} item={item} addingNewCartItems={this.addingNewCartItems} /> ;
    
        });
    }

    snackItems() {
    
        return this.state.snacksData.map(item => {
            
            return <SnackItem key={item.id} item={item} addingNewCartItems={this.addingNewCartItems} /> ;
    
        });
    }

    drinkItems() {
    
        return this.state.drinksData.map(item => {
            
            return <DrinkItem key={item.id} item={item} addingNewCartItems={this.addingNewCartItems} /> ;
    
        });
    }

    dessertItems() {
    
        return this.state.dessertsData.map(item => {
            
            return <DessertItem key={item.id} item={item} addingNewCartItems={this.addingNewCartItems} /> ;
    
        });
    }

    render() {

        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }   
        
        return (
            <div className="menu container">
                <div className="top-section-wrapper">
                    <Cart cartItems={this.state.cartItems} eatInOutStatus={this.state.eatInOutStatus} />

                </div>

                <div className="botton-section-wrapper">
                    <div className="side-bar-wrapper">
                        <SidebarComponent />
                    </div>

                    <div className="menu-section-wrapper">
                        <div className="menu-items-heading-wrapper">
                            <h1>BURGERS</h1>
                            <div id="burgers" className="menu-items-wrapper">
                                {this.burgerItems()}
                            </div>
                        </div>

                        <div className="menu-items-heading-wrapper">
                            <h1>BAGUETTES</h1> 
                            <div id="baguettes" className="menu-items-wrapper">
                                {this.baguetteItems()}
                            </div>
                        </div>

                        <div className="menu-items-heading-wrapper">
                            <h1>SNACKS</h1> 
                            <div id="snacks" className="menu-items-wrapper">
                                {this.snackItems()}
                            </div>
                        </div>

                        <div className="menu-items-heading-wrapper">
                            <h1>DRINKS</h1>
                            <div id="drinks" className="menu-items-wrapper" >
                                {this.drinkItems()}
                            </div>
                        </div>

                        <div className="menu-items-heading-wrapper">
                            <h1>DESSERTS</h1>    
                            <div id="desserts" className="menu-items-wrapper">
                                {this.dessertItems()}
                            </div>
                        </div>

                    </div>
                    
                </div>
                
            </div>
            
        );
        
    }
}