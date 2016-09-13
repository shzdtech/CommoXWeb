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
        let u = {
            label: '用户邮箱',
            type: 'text',
            key: 'email',
            length: 'medium',
            placehodler: '请输入您的邮箱'
        };
        let isValid = validateEmail(this.props.newUser.email);

        return <div className='create-user-container'>
            <Input info={u} onChangeForm={this.props.onChangeForm} />
            <div className='create-user-operators'>
                <span className={'btn btn-large submit ' + (isValid ? '' : 'disabled') }
                    onClick={() => { isValid && this.props.submitCreateUser(this.props.newUser) } }>提交</span>
            </div>
        </div>
    }
}

module.exports = CreateUser;