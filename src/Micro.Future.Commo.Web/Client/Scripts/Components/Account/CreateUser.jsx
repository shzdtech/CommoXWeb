import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Input from './Input';
import validateEmail from '../../Util/validateEmail';

class CreateUser extends React.Component {
    constructor() {
        super();
    }

    render() {
        let newUser = this.props.newUser;
        let list = [];
        let disabled = false;
        let errorCount = 0;

        if (newUser['password'].value !== newUser['confirmPassword'].value) {
            newUser['confirmPassword'].labelError = '密码不一致';
            errorCount++;
        } else {
            newUser['confirmPassword'].labelError = null;
        }
        
        disabled = !validateEmail(this.props.newUser.email.value);

        for (var key in newUser) {
            let info = newUser[key];
            if ((info.isRequired && (info.value === undefined || info.value === null || info.value === '')) || errorCount > 0) {
                disabled = true;
            }

            list.push(<Input key={key} info={info} onChangeForm={this.props.onChangeCreateUserForm} />);
        }

        return <div className='create-user-container'>
            {list}
            <div className='create-user-operators'>
                <span className={'btn btn-large submit ' + (disabled ? 'disabled' : '') }
                    onClick={() => { !disabled && this.props.submitCreateUser(this.props.newUser) } }>提交</span>
            </div>
        </div>
    }
}

module.exports = CreateUser;