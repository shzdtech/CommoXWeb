import React from 'react';
import Requirements from './Requirement/Requirements';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <Requirements {...this.props} />
        </div>;
    }
}

module.exports = Home;