import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }


    updatePurchaseState = (ingredients) => {
        //  Create an array of ingredients.
        const sum = Object.keys(ingredients)
            //  Map through the created array.
            .map(igKey => {
                //   Return the count of each ingredient.
                return ingredients[igKey];
            })
            //  Sum all the values together.
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        //  Set "state.purchasable" to "True" or "False".
        this.setState({purchasable: sum > 0});
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
        this.updatePurchaseState(updatedIngredients);
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) {
            return;
        }
        //  Update the count of an ingredient.
        const updatedCount = oldCount - 1;

        //  Fetch the ingredients object from the state and update the count.
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        //  Fetch the ingredient price from the INGREDIENT_PRICES.
        const priceDeduction = INGREDIENT_PRICES[type];
        //  Fetch the totalPrice from the state.
        const oldPrice = this.state.totalPrice;
        //  Deduct the price of the ingredient from totalPrice.
        const newPrice = oldPrice - priceDeduction;
        //  Set the state accordingly.
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler= () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }


    render() {

        //  Make a copy of the state.
        const disabledInfo = {...this.state.ingredients};

        //  Loop through the copied state.
        for(let key in disabledInfo) {
            //  If the count of the ingredient is 0 or less, set the count to "True".
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCancelled={this.purchaseCancelHandler} 
                        purchaseContinued={this.purchaseContinueHandler}
                        orderPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    purchased={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;