import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Input from './Input';

class ChangePassword extends React.Component {
    constructor() {
        super();
    }

    render() {
        let error = null;
        if(this.props.password.newPassword !== this.props.password.newPasswordConfirm){
            error = <div className="error">新密码不一致</div>
        }

        let inputs = this.props.forms.map((l) => {
            return  <Input key={l.key} info={l} onChangeForm={this.props.onChangeForm} />
        })
        return <div className='change-password-container'>
            <div className="instruction">密码长度不少于8位，并且包含数字，大小字母写或符号</div>
            {inputs}
            {error}
            <div className='change-password-operators'>
                <span className='btn btn-large submit' onClick={()=>{this.props.submitChangePassword(this.props.password)}}>提交</span>
            </div>
        </div>
    }
}

module.exports = ChangePassword;