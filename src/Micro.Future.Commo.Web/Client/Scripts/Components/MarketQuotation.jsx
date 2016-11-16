import React from 'react';
import PriceTab from './Home/PriceTab';
import BasisTab from '../Containers/Home/BasisTab';
import FinanceTab from '../Containers/Home/FinanceTab';
import RequirementTab from './Home/RequirementTab';
import AcceptanceBillTab from '../Containers/Home/AcceptanceBillTab';
import ContactSideBar from './Common/ContactSideBar';

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
            <ContactSideBar />
        </div>;
    }
}

module.exports = MarketQuotation;