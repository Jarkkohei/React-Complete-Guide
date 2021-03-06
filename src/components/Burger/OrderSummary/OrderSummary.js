import React from 'react';

import Aux from './../../../hoc/Auxiliary/Auxiliary';
import Button from './../../UI/Button/Button';

const orderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            //  Show ingredient in the list only if it really is added as an ingredient.
            if(props.ingredients[igKey] > 0) {
                return(
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
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
            <p>Total Price: <strong>{props.orderPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;