import React, { Component } from 'react';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import Order from './../../components/Order/Order';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }


    componentDidMount() {
        axios.get('orders.json')
            .then(res => {

                //  Convert the fetched object into an array.
                const fetchedOrders = [];

                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                //  Fetching the orders has stopped (successfully).
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                //  Fetching the orders has stopped (failed).
                this.setState({loading: false});
            });
    }


    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);