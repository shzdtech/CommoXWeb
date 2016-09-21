import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';

class Popup extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='popup-conatainer'>
            <span className='glyphicon glyphicon-remove' onClick={this.props.onClosePopup}></span>
            <div className='popup-content'>
                {this.props.children}
            </div>
            <div className='popup-overlay'></div>
        </div>
    }
}

module.exports = Popup;