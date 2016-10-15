import React from 'react';
import MainSlider from './Common/MainSlider';
import PriceTab from './Home/PriceTab';
import FinanceTab from './Home/FinanceTab';
import RequirementTab from './Home/RequirementTab';
import AcceptanceBillTab from './Home/AcceptanceBillTab';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <MainSlider />
            <PriceTab />
            <FinanceTab />
            <AcceptanceBillTab />
            <RequirementTab {...this.props}/>
        </div>;
    }
}

module.exports = Home;