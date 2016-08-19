import React from 'react';
import Select from 'react-select';
import '../../../Content/react-select/components.scss';

class Dropdown extends React.Component {
    constructor() {
        super();
        this.changeSelected = this.changeSelected.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    render() {
        const {info} = this.props;
        let selectedLabel = '请选择...';
        info.options.forEach((o)=>{
            if(info.value === o.value){
                selectedLabel = o.label;
                console.log(o.label);
                return true;
            }
        })
        return <div className='select-container'>
            <label className="input_label" htmlFor={info.label}>
                <span className="label_text">{info.label}</span>
            </label>
            <Select className='custom-select' placeholder='请选择...'
                value={info.value}
                options={info.options}
                onChange={this.changeSelected}
                onBlur={this.onBlur} />
        </div>
    }

    changeSelected(val) {
        this.props.onChangeEnterpriseForm(this.props.info.key, Object.assign({}, this.props.info, { value: val.key }));
    }

    onBlur(e){
        console.log(e);
    }
}

module.exports = Dropdown;