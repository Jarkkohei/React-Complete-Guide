import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    /* An alternative way of implementing the state.
    constructor(props) {
        super(props);
        this.state = {...}
    }
    */

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        //  Update the count of an ingredient.
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        //  Fetch the ingredients object from the state and update the count.
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        //  Fetch the ingredient price from the INGREDIENT_PRICES.
        const priceAddition = INGREDIENT_PRICES[type];
        //  Fetch the totalPrice from the state.
        const oldPrice = this.state.totalPrice;
        //  Add the price of the ingredient to totalPrice.
        const newPrice = oldPrice + priceAddition;
        //  Set the state accordingly.
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {

    }


    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;