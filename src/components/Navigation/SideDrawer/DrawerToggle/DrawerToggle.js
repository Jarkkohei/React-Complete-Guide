import React from 'react';

import classes from './DrawerToggle.css'

const drawerToggle = (props) => (
    <div 
        className={classes.drawerToggle}
        onClick={props.clicked}>
        Menu
    </div>
);

export default drawerToggle;