import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';
import * as actionTypes from './../../store/actions';

class BurgerBuilder extends Component {

    /* An alternative way of implementing the state.
    constructor(props) {
        super(props);
        this.state = {...}
    }
    */

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get('https://react-my-burger-899db.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
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
        const disabledInfo = {...this.props.ings};

        //  Loop through the copied state.
        for(let key in disabledInfo) {
            //  If the count of the ingredient is 0 or less, set the count to "True".
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Could not load the ingredients!</p> : <Spinner />;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>;
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.props.price}
                        purchased={this.purchaseHandler}/>
                </Aux>);

            orderSummary = <OrderSummary 
                ingredients={this.props.ings} 
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}
                orderPrice={this.props.price}/>;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));