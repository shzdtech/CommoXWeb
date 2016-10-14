import React from 'react';
import MainSlider from './Common/MainSlider';
import PriceTab from './Home/PriceTab';
import RequirementTab from './Home/RequirementTab';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <MainSlider />
            <PriceTab />
            <RequirementTab {...this.props}/>
        </div>;
    }
}

module.exports = Home;