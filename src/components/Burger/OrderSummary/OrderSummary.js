import React from 'react';

import Aux from './../../../hoc/Auxiliary';
import Button from './../../UI/Button/Button';

const orderSummary = (props) => {

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
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.modalClosed}>CANCEL</Button>
            <Button btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;