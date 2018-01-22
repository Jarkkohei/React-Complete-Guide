import React, { Component } from 'react';

import Modal from './../../components/UI/Modal/Modal';
import Aux from './../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            //  Clear the possible existing errors.
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({errors: null});
                return req;
            });
            //  Set the state.error to the actual response error-object (including the message.property).
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            //  Get rid of un-needed interceptors.
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }  
    }
}

export default withErrorHandler;