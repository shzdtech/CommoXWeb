import React from 'react';
import PriceTab from './Home/PriceTab';
import BasisTab from './Home/BasisTab';
import FinanceTab from '../Containers/Home/FinanceTab';
import RequirementTab from './Home/RequirementTab';
import AcceptanceBillTab from '../Containers/Home/AcceptanceBillTab';

class MarketQuotation extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <PriceTab />
            <BasisTab />
            <FinanceTab />
            <AcceptanceBillTab />
        </div>;
    }
}

module.exports = MarketQuotation;