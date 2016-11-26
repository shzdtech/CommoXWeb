import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';
import Requirements from '../Requirement/Requirements';

class PriceTab extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='requirement-tab'>
            <div className='container'>
                <Tab title='客户需求'>
                    <Requirements {...this.props} />
                </Tab>
            </div>
        </div>
    }
}

module.exports = PriceTab;