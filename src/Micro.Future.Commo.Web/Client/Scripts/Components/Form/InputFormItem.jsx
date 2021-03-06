import React, {PropTypes} from 'react';

class InputFormItem extends React.Component {
    constructor() {
        super();
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    render() {
        let {formItem} = this.props;
        if(!formItem.value){
            formItem.value = '';
        }
        return <div className='form-item'>
            <label className="input_label" htmlFor={formItem.title}>
                <span className={"label_text " + (formItem.isRequired ? 'required' : '')}>{formItem.title}</span>
            </label>
            <input type="text" className="form-control" value={formItem.value} placeholder={formItem.placeholder ? formItem.placeholder : formItem.title}  onChange={(e) => { this.handleValueChange(e) } }/>
            <span className='unit'>{formItem.unit}</span>
        </div>
    }

    handleValueChange(e) {
        this.props.onFormItemTyped(this.props.formItem, e.target.value);
    }
}

export default InputFormItem;