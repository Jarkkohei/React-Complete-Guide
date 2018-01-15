import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    //  Get the ingredients names (keys) from the object...
    const transformedIngredients = Object.keys(props.ingredients)
        //  Map through every name (igKey)...
        .map(igKey => {
            //  Return an array of ingredient names (igKey) as keys and make a "key"-prop for each them with the name and index (Ex. Salad1, Salad2,...).
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        });

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;