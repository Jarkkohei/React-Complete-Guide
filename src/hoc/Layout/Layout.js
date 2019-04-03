import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Aux from './../Auxiliary/Auxiliary';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {

    const [sideDraverIsVisible, setSideDraverIsVisible] =  useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDraverIsVisible(false);
    }

    //  Assyncronously handling the state.
    const sideDrawerToggleHandler = () => {
        setSideDraverIsVisible(!sideDraverIsVisible);
    }

    return(
    <Aux>
        <Toolbar 
            isAuth={props.isAuthenticated}
            drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDrawer 
            isAuth={props.isAuthenticated}
            open={sideDraverIsVisible} 
            closed={sideDrawerClosedHandler}/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);