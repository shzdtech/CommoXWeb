import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';

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
                <span className='glyphicon glyphicon-remove' onClick={this.props.onCloseForm}></span>
                <div className='title'>登录您的帐号</div>
                <input type="text" className="form-control" ref='email' placeholder='用户邮箱' />
                <input type="password" className="form-control" ref='password' placeholder='密码'/>
                <a className='btn login-btn' onClick={this.onLogin}>登录</a>
                <div className='no-account'>
                    <Link to='/resetPassword' >忘记密码</Link>
                    没有账号？
                    <Link to='/register' >注册</Link>
                </div>
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
        this.props.onCloseForm();
    }
}

module.exports = Login;