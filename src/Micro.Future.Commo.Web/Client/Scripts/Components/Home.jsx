import React from 'react';
import MainSlider from './Common/MainSlider';
import PriceTab from './Home/PriceTab';
import BasisTab from './Home/BasisTab';
import FinanceTab from '../Containers/Home/FinanceTab';
import RequirementTab from './Home/RequirementTab';
import AcceptanceBillTab from '../Containers/Home/AcceptanceBillTab';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <MainSlider />
            <PriceTab />
            <BasisTab />
            <FinanceTab />
            <AcceptanceBillTab />
        </div>;
    }
}

module.exports = Home;