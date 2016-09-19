import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Input from './Input';
import EmailVerfication from './EmailVerfication';

class ResetPassword extends React.Component {
    constructor() {
        super();
    }

    render() {
        let error = null;
        let errorCount = 0;
        let disabled = false;

        const {form, onChangeForm, onSubmitForm, getVerficationCode} = this.props;
        if (form['password'] && form['confirmPassword'] && form['password'].value !== form['confirmPassword'].value) {
            form['confirmPassword'].labelError = '密码不一致';
            errorCount++;
        } else if (form['confirmPassword']) {
            form['confirmPassword'].labelError = null;
        }

        let list = [];

        for (var key in form) {
            let info = form[key];
            if ((info.isRequired && (info.value === undefined || info.value === null || info.value === '')) || errorCount > 0) {
                disabled = true;
            }
            if (info.key === 'email') {
                list.push(<EmailVerfication info={info} onChangeForm={onChangeForm} key={key} getVerficationCode={getVerficationCode} />)
            } else {
                list.push(<Input key={key} info={info} onChangeForm={onChangeForm} />);
            }
        }

        return <div className='reset-password-container'>
            {list}
            <div className='reset-password-operators'>
                 <span className={'btn btn-large submit ' + (disabled ? 'disabled' : '')}  
                 onClick={()=>{if(!disabled){onSubmitForm(form)}}}>提交</span>
            </div>
        </div>
    }
}

module.exports = ResetPassword;