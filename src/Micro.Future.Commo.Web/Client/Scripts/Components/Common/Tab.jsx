import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';

class Tab extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='main-tab'>
            <div className='main-tab-header'>{this.props.title}</div>
            <div className='main-tab-content'>
                {this.props.children}
            </div>
        </div>
    }
}

module.exports = Tab;