import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
    render() {
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
                            <li>
                             { this.props.userInfo &&　this.props.userInfo.userName ? <a href='#'>{this.props.userInfo.userName}</a> : <Link to="/login">登录</Link>}
                             </li>
                            <li><Link to="/register">注册</Link></li>
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