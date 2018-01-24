import React, { Component } from 'react';

import Aux from './../../../hoc/Auxiliary/Auxiliary';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component {

    //  This component could as well be a functional component.
    //  There is NO reason for it to be a class.

    componentWillUpdate() {
        console.log('[OrderSummary] will update');
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                //  Show ingredient in the list only if it really is added as an ingredient.
                if(this.props.ingredients[igKey] > 0) {
                    return(
                        <li key={igKey}>
                            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                        </li>
                    );
                } else {
                    return null;
                }
            });


        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{this.props.orderPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;