import React from 'react';
import Select from 'react-select';
import '../../../Content/react-select/components.scss';

class Dropdown extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {info} = this.props;
        return <div className='select-container'>
            <label className="input_label" htmlFor={info.label}>
                <span className="label_text">{info.label}</span>
            </label>
            <Select className='custom-select' placeholder='请选择...' value={null} options={info.options} />
        </div>
    }
}

module.exports = Dropdown;