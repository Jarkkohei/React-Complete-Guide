import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

//  shallow renders the nested components as placeholders.

//  Connect Enzyme
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});