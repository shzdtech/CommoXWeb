import React from 'react';
import Input from './Input';
import Dropdown from './Dropdown';

class Register extends React.Component {
    constructor() {
        super();
    }

    render() {
        let list = [];
        let disabled = false;
        const {enterpriseInfo, onChangeEnterpriseForm, onSubmitEnterpriseForm} = this.props;
        for (var key in enterpriseInfo) {
            let info = enterpriseInfo[key];
            if(info.isRequired && (info.value === undefined ||　info.value === null || info.value === '')){
                disabled = true;
            }
            if (info.type === 'text' || info.type === 'date' || info.type === 'file' || info.type === 'number') {
                list.push(<Input key={key} info={info} onChangeForm={onChangeEnterpriseForm} />);
            } else if (info.type === 'select') {
                list.push(<Dropdown key={key} info={info} onChangeEnterpriseForm={onChangeEnterpriseForm} />);
            }
        }
        return <div>
            {list}
            <div className='register-operators'>
                <span className={'btn btn-large submit ' + (disabled ? 'disabled' : '')}  onClick={()=>{if(!disabled){onSubmitEnterpriseForm(enterpriseInfo)}}}>提交</span>
                <span className='btn btn-large calloff' >取消</span>
            </div>
        </div>
    }
}

module.exports = Register;