import React from 'react';
import {Link} from 'react-router';
import {DropdownButton, MenuItem} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        const loginAndRegister = () => {
            if (this.props.userInfo && this.props.userInfo.userName) {
                return <li key="userInfo">
                    <DropdownButton title={this.props.userInfo.userName} id="bg-nested-dropdown" >
                        <MenuItem eventKey="createUser" onSelect={this.props.onSelectDropdown}>创建用户</MenuItem>
                        <MenuItem eventKey="changePassword" onSelect={this.props.onSelectDropdown}>修改密码</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="updateEnterprise" onSelect={this.props.onSelectDropdown}>企业认证</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="signOut" onSelect={this.props.onSelectDropdown}>退出</MenuItem>
                    </DropdownButton>
                </li>
            } else {
                return [
                    <li key="login"><Link to="/login">登录</Link></li>,
                    <li key="register"><Link to="/register">注册</Link></li>
                ];
            }
        }

        return <div className='header'>
            <nav className='navbar navbar-default'>
                <div className='container'>
                    <div className="navbar-header">
                        <div className="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="glyphicon glyphicon-menu-hamburger"></span>
                        </div>
                        <div className="navbar-brand">
                        </div>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse" aria-expanded="false">
                        <div className="close-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="icon-delete"></span></div>
                        <ul className='nav navbar-nav navbar-left'>
                            <li><Link to="/requirement">我的需求</Link></li>
                            <li><Link to="/addRequirement">添加新需求</Link></li>
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                            {loginAndRegister()}
                            <li><Link to="/chainManager">管理</Link></li>
                        </ul>
                        <div className='clearfix'></div>
                    </div>
                </div>
            </nav>
        </div>
    }
}

module.exports = Header;