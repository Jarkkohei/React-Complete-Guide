import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
//import { purchaseBurgerStart } from '../../../store/actions/order';
import * as actions from './../../../store/actions/index';
import { updateObject, checkValidity } from './../../../shared/utility';

const contactData = props => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLentgh: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'},
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);


    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for(let formElementIdentifier in orderForm) {
            //  Create key/value-pairs with the "name"- and the "value" of the inputs.
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        //  !!! You should NOT calculate the price at the client-side.
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        //  Make a copy of the next step properties. (Next step id not needed because we only need the "value" property!!!)
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        //  Check if all the inputs are valid (= form is valid).
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            //  If the form was already valid and the current input is valid, set the form to be "valid".
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        //console.log(formIsValid);
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    //  Make an array of formElements with their own id and configuration.
    const formElementsArray = [];

    for(let key in orderForm) {
        //  keys are name, street, zipCode, country, email, deliveryMethod
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if(props.loading) {
        form = <Spinner />
    }

    return(
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };   
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));