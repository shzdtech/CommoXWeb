import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';

class Popup extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <div className='popup-conatainer'>
                <div className='popup-header'>
                    <span className='glyphicon glyphicon-remove' onClick={this.props.onClosePopup}></span>
                    {this.props.title}
                </div>
                <div className='popup-content'>
                    {this.props.children}
                </div>
            </div>
            <div className='popup-overlay'></div>
        </div>
    }
}

module.exports = Popup;