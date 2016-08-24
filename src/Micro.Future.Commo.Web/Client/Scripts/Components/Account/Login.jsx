import React from 'react';
import { push } from 'react-router-redux';

class Login extends React.Component {
    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this);
        this.cancelLogin = this.cancelLogin.bind(this);
    }

    render() {
        const {info} = this.props;
        return <div className='login-form-conatainer'>
            <div className='login-form'>
                <div className='title'>登录您的帐号</div>
                <input type="text" className="form-control" ref='email' placeholder='用户邮箱' />
                <input type="password" className="form-control" ref='password' placeholder='密码'/>
                <a className='btn login-btn' onClick={this.onLogin}>登录</a>
            </div>
            <div className='login-form-overlay' onClick={this.cancelLogin}></div>
        </div>
    }

    onLogin() {
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        if (email !== null && email !== '' && password !== null && password !== '') {
            this.props.onLogin(email, password);
        }
    }

    cancelLogin() {

    }
}

module.exports = Login;