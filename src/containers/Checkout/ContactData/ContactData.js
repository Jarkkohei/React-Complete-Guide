import React, { Component } from 'react';

import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }


    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        //  !!! You should NOT calculate the price at the client-side.
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Pekka Virtanen',
                address: {
                    street: 'Testikatu 1',
                    zipCode: '001155',
                    country: 'Finland'
                },
                email: 'texst@test.com'
            },
            deliveryMethod: 'fastest'
        }

        //  ".json" id required by the Firebase
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }


    render() {

        let form = (
            <form>
                <Input inputtype="input" label="Name:"type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" label="Email:" type="email" name="email" placeholder="Your E-mail" />
                <Input inputtype="input" label="Street address:" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" label="Postal Code:" type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;