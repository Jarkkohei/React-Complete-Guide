import React, { Component } from 'react';

import Modal from './../../components/UI/Modal/Modal';
import Aux from './../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            //  Clear the possible existing errors.
            axios.interceptors.request.use(req => {
                this.setState({errors: null});
            });
            //  Set the state.error to the actual response error-object (including the message.property).
            axios.interceptors.response.use(null, error => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler() {
            this.setState({error: null});
        }

        render() {
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        clicked={this.errorConfirmedHandler}>
                        {this.state.error.message}}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }  
    }
}

export default withErrorHandler;