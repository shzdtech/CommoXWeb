import React from 'react';
import MainSlider from './Common/MainSlider';
import Partner from './Home/Partner';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <MainSlider />
            <Partner />
        </div>;
    }
}

module.exports = Home;