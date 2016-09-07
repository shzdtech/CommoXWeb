import React from 'react';

class Toastr extends React.Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.shouldSpin) {
            return <div className='spinner-container'>
                <div className='spinner spinner-shrink'>
                </div>
                <div className='overlay'>
                </div>
            </div>
        }
        return <div></div>;
    }
}

module.exports = Toastr;