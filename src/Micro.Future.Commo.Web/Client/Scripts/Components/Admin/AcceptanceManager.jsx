import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Input from '../Account/Input';
import DropDown from '../Account/DropDown';

class AcceptanceManager extends React.Component {
    constructor() {
        super();
    }

    render() {
        let list = [];
        let disabled = false;
        
        const {acceptanceInfo, onSubmit, onChangeForm} = this.props;

        for (var key in acceptanceInfo) {
            let info = acceptanceInfo[key];
            if ((info.isRequired && (info.value === undefined || 　info.value === null || info.value === ''))) {
                disabled = true;
            }
            if (info.type === 'text' || info.type === 'date' || info.type === 'number' || info.type === 'password') {
                list.push(<Input key={key} info={info} onChangeForm={onChangeForm} />);
            } else if (info.type === 'select') {
                list.push(<Dropdown key={key} info={info} onChangeForm={onChangeForm} />);
            }
        }
        return <div>
            {list}
            <div className='register-operators'>
                <span className={'btn btn-large submit ' + (disabled ? 'disabled' : '') }  onClick={() => { if (!disabled) { onSubmit(acceptanceInfo) } } }>提交</span>
                <span className='btn btn-large calloff' >取消</span>
            </div>
        </div>
    }
}

module.exports = AcceptanceManager;