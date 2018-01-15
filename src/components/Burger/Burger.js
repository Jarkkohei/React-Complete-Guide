import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    //  Get the ingredient names (keys) from the object...
    let transformedIngredients = Object.keys(props.ingredients)
        //  Map through every name (igKey)...
        .map(igKey => {
            //  Return an array of ingredient names (igKey) as keys and make a "key"-prop for each them with the name and index (Ex. Salad1, Salad2,...).
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        //  Reduce (flatten) the arrays to a one array.
        .reduce((arr, element) => {
            return arr.concat(element)
        }, []);

    //console.log(transformedIngredients);
    
    //  If no ingredient are choosed, show text "Please choose ingredients" in place of ingredients.
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please choose ingredients</p>;
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;