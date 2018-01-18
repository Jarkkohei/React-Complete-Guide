import React, { Component } from 'react';

import classes from './Layout.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    //  Assyncronously handling the state.
    sideDrawerToggleHandler = () => {
        //  Get the previous state...
        this.setState((prevState) => {
            //  ...and make the comparison (!) with it 
            //  instead of trying to access the state directly.
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return(
        <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

export default Layout;