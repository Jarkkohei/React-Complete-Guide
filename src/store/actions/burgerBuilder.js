import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};


export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};


//  Syncronous action used by asyncronous action initIngredients().
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};


//  Syncronous action used by asyncronous action initIngredients().
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}


//  Asyncronous action using syncronous actions
export const initIngredients = () => {
    return dispatch = {
        axios.get('https://react-my-burger-899db.firebaseio.com/ingredients.json')
             .then(response => {
                 dispatchEvent(setIngredients(response.data));
             })
            .catch(error => {
                 dispatch(fetchIngredientsFailed());
             });
    };
};