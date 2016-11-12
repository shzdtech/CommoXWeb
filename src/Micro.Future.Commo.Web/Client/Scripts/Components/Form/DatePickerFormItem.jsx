import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');

import '../../../Content/react-datepicker.scss';

class DatePickerFormItem extends React.Component {
    constructor() {
        super();
        this.changeValue = this.changeValue.bind(this);
    }

    render() {

 let {formItem} = this.props;
        let selectedDate = null;
        if(formItem.value){
            selectedDate = moment(formItem.value);
        }

        return <div className='form-item'>
            <label className="input_label" htmlFor={formItem.title}>
                <span className={"label_text " + (formItem.isRequired ? 'required' : '')}>{formItem.title}</span>
            </label>
             <DatePicker
                selected={selectedDate}
                onChange={this.changeValue}
                placeholderText={formItem.placeholder ? formItem.placeholder : formItem.title} />          
            <span className='unit'>{formItem.unit}</span>
        </div>
    }

    changeValue(e) {
        this.props.onFormItemTyped(this.props.formItem, e.format("YYYY-MM-DD") );
    }
}

module.exports = DatePickerFormItem;