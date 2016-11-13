import React, {PropTypes} from 'react';

class LabelItem extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {formItem} = this.props;

        return <div className='form-item'>
            <label className="input_label" htmlFor={formItem.key}>
                <span className={"label_text " + (formItem.isRequired ? 'required' : '')}>{formItem.title}</span>
            </label>
            <label className="input_label" htmlFor={formItem.key}>
                <span className="label_text">{formItem.value}</span>
            </label>
        </div>
    }
}

export default LabelItem;