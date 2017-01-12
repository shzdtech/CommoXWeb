import React, {PropTypes} from 'react';

class Label extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {info} = this.props;

        var value_label = null;

        if(info.type === 'file'){
            value_label = <span><a download={info.value} href={info.value}>{info.label}</a></span>
        }else{
            <span className="label_text">{info.value}</span>
        }

        return <div className='input-container'>
            <label className="input_label" htmlFor={info.key}>
                <span className="label_text">{info.label}:</span>
            </label>
            <label className="input_value" htmlFor={info.key}>
                <span className="label_text">{info.value}</span>
            </label>
        </div>
    }
}

export default Label;