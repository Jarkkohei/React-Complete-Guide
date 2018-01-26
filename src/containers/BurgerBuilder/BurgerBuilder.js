import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';

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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-899db.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
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

        const queryParams = [];

        for(let i in this.state.ingredients) {
            //  Stringify every ingredient name and value together with the "=".sign in between. Eg. "salad=1"
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        //  Push the totalPrice to the queryParams.
        queryParams.push('price=' + this.state.totalPrice);

        //  Join all the stringified ingredient name/value pairs together with the "&"-sign in between. Eg. "salad=1&meat=1&bacon=2&cheese=2" 
        const queryString = queryParams.join('&');

        //  Navigate to the "/checkout" with the queryParams.
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }


    render() {

        //  Make a copy of the state.
        const disabledInfo = {...this.state.ingredients};

        //  Loop through the copied state.
        for(let key in disabledInfo) {
            //  If the count of the ingredient is 0 or less, set the count to "True".
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Could not load the ingredients!</p> : <Spinner />;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>;
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        purchased={this.purchaseHandler}/>
                </Aux>);

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}
                orderPrice={this.state.totalPrice}/>;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>

                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);