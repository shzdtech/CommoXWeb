import React from 'react';

class CheckBox extends React.Component{
    render() {
        var className = 'checkbox ' + this.props.className;
        return <div className={className}>
            <input type='checkbox' checked={this.props.checked} onClick={this.props.onChecked} />
            <span></span>
        </div>
    }
}

module.exports = CheckBox;