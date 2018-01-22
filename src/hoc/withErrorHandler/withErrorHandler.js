import React from 'react';

import Modal from './../../components/UI/Modal/Modal';
import Aux from './../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent) => {
    return(props) => {
        return(
            <Aux>
                <Modal>
                    Something didn't work right!
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;