import React from 'react';
import Requirements from './Requirement/Requirements';
import MainSlider from './Common/MainSlider';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <MainSlider />
            <div className='container main-wrapper'>
                <Requirements {...this.props} />
            </div>
        </div>;
    }
}

module.exports = Home;