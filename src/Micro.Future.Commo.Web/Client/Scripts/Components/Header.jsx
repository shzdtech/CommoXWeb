import React from 'react';
import {Link} from 'react-router';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import Spinner from './Common/Spinner';
import Toastr from './Common/Toastr';

class Header extends React.Component {
    componentDidMount(){
        this.props.checkEnterpriseAuthenticated();
    }

    render() {
        const userPanel = () => {
            if (this.props.userInfo && this.props.userInfo.userName) {
                if (this.props.userInfo.roles.filter((r) => { return r === 'Admin' }).length > 0) {
                    return [                      
                        <li key="authEnterprise"><Link to="/authEnterprise">企业认证</Link></li>,
                        <li key="manageChain">
                            <DropdownButton title="撮合管理" id="bg-nested-dropdown" key="finance">
                            <MenuItem eventKey="chainManager" onSelect={this.props.onSelectDropdown}>现有撮合管理</MenuItem>
                            <MenuItem eventKey="makeChain" onSelect={this.props.onSelectDropdown}>立刻撮合</MenuItem>
                            <MenuItem eventKey="matchChainManually" onSelect={this.props.onSelectDropdown}>手动撮合</MenuItem>
                            <MenuItem eventKey="createChainManually" onSelect={this.props.onSelectDropdown}>手动创建</MenuItem>
                        </DropdownButton>
                        </li>,
                        <li key="finance">
                        <DropdownButton title="金融产品管理" id="bg-nested-dropdown" key="finance">
                            <MenuItem eventKey="financeManage" onSelect={this.props.onSelectDropdown}>银行理财产品</MenuItem>
                            <MenuItem eventKey="acceptanceManage" onSelect={this.props.onSelectDropdown}>银行承兑汇票</MenuItem>
                        </DropdownButton>
                    </li>,
                        <li key="userInfo">
                        <DropdownButton title={this.props.userInfo.userName} id="bg-nested-dropdown" >
                            <MenuItem eventKey="changePassword" onSelect={this.props.onSelectDropdown}>修改密码</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="signOut" onSelect={this.props.onSelectDropdown}>退出</MenuItem>
                        </DropdownButton>
                    </li>]
                } else {
                    return [<li key="requirement"><Link to="/requirement">我的需求</Link></li>,
                        <li key="addrequirement"><Link to="/addRequirement">添加新需求</Link></li>,
                        <li key="userInfo">
                            <DropdownButton title={this.props.userInfo.userName} id="bg-nested-dropdown" >
                                {this.props.userInfo.roles.filter((r) => { return r === 'Administrator' }).length > 0 ?
                                <MenuItem eventKey="updateEnterprise" onSelect={this.props.onSelectDropdown}>企业认证</MenuItem>: null}
                                {this.props.userInfo.roles.filter((r) => { return r === 'Administrator' }).length > 0 ?
                                <MenuItem eventKey="createUser" onSelect={this.props.onSelectDropdown}>创建用户</MenuItem> : null}
                                <MenuItem divider />
                                <MenuItem eventKey="changePassword" onSelect={this.props.onSelectDropdown}>修改密码</MenuItem>
                                <MenuItem eventKey="signOut" onSelect={this.props.onSelectDropdown}>退出</MenuItem>
                            </DropdownButton>
                        </li>]
        }
            } else {
                return [
                    <li key="login"><Link to="/login">登录</Link></li>,
                    <li key="register"><Link to="/register">注册</Link></li>
                ];
            }
        }

        return <div className='header'>
            <nav className='navbar navbar-default navbar-fixed-top'>
                <div className='container'>
                    <div className="navbar-header">
                        <div className="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="glyphicon glyphicon-menu-hamburger"></span>
                        </div>
                        <div className="navbar-brand">
                        </div>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse" aria-expanded="false">
                        <div className="close-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="icon-delete"></span></div>
                        <ul className='nav navbar-nav navbar-left'>
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/marketQuotation">行情</Link></li>
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                            {userPanel() }
                        </ul>
                        <div className='clearfix'></div>
                    </div>
                </div>
            </nav>
            <Spinner shouldSpin={this.props.showSpinner} />
            <Toastr options={this.props.toastrOptions} hideToastr={this.props.hideToastr} />
        </div>
    }
}

module.exports = Header;