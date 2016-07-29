import React from 'react';

class CheckBox extends React.Component{
    constructor(){
        super();
        this.onChecked = this.onChecked.bind(this);
    }
    onChecked(event){
        event.stopPropagation();
        this.props.onChecked(event.target.checked);
    }
    render() {
        var className = 'checkbox ' + this.props.className;
        return <div className={className}>
            <input type='checkbox' checked={this.props.isChecked} onChange={this.onChecked}/>
            <span></span>
        </div>;
    }
}

module.exports = CheckBox;