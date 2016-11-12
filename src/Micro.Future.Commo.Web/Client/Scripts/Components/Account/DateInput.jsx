import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');

import '../../../Content/react-datepicker.scss';

class DateInput extends React.Component {
    constructor() {
        super();
        this.changeValue = this.changeValue.bind(this);
    }

    render() {
        const {info} = this.props;
        let requiredNotation = null;
        if (info.isRequired) {
            requiredNotation = <span className="required"></span>;
        }

        let selectedDate = moment();
        if(info.value){
            selectedDate = moment(info.value);
        }

        return <div className='input-container'>
            <label className="input_label" htmlFor={info.label}>
                <span className="label_text">{info.label}</span>
            </label>
            <DatePicker
                selected={selectedDate}
                onChange={this.changeValue}
                placeholderText={info.placeholder} />
            {requiredNotation}
        </div>
    }

    changeValue(e) {
        this.props.onChangeForm(this.props.info.key, Object.assign({}, this.props.info, { value: e.format("YYYY-MM-DD") }));
    }
}

module.exports = DateInput;