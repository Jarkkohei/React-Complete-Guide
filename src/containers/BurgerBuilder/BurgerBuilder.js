import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from './../../axios-orders';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../store/actions/index';

const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
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
        return sum > 0;
    }

    const purchaseHandler = () => {
        if(props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        
    }

    const purchaseCancelHandler= () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        
        //  Navigate to the "/checkout" with the queryParams.
        props.history.push('/checkout');
    }

    //  Make a copy of the state.
    const disabledInfo = {...props.ings};

    //  Loop through the copied state.
    for(let key in disabledInfo) {
        //  If the count of the ingredient is 0 or less, set the count to "True".
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error ? <p>Could not load the ingredients!</p> : <Spinner />;

    if(props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings}/>;
                <BuildControls 
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    price={props.price}
                    purchased={purchaseHandler}
                    isAuth={props.isAuthenticated}/>
            </Aux>);

        orderSummary = <OrderSummary 
            ingredients={props.ings} 
            purchaseCancelled={purchaseCancelHandler} 
            purchaseContinued={purchaseContinueHandler}
            orderPrice={props.price}/>;
    }

    return(
        <Aux>
            <Modal 
                show={purchasing}
                modalClosed={purchaseCancelHandler}>

                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));