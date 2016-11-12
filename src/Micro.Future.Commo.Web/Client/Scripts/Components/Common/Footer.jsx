import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';

class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='footer'>
            <div className="footer-info">
				<div className="webmap">
					<ul>
						<li>
							<h1>帮助中心</h1>
                            <a href="#">网点查询</a> 
                            <a href="#">常见问题</a></li>
						<li>
							<h1>关于我们</h1> 
                            <a href="#">公司介绍</a>
                            <a href="#">联系我们</a>
                            <a href="#">招贤纳士</a>
                        </li>

					</ul>
					<div className="clearfix"></div>
				</div>
				<div className="weixin_ico">
					<img  />
				</div>
				<div className="foot-phone">
					<div><span className="glyphicon glyphicon-headphones"></span>客服热线：</div>
					<p>400-000-0000</p>
					<span>接听时间：工作日 9:00-18:00</span>
				</div>
                <div className="clearfix"></div>
                <div className="copyright">京ICP备&&&&&&号-2 Copyright 2016-2018 easemore（www.easemore.com）版权所有</div>
			</div>
        </div>
    }
}

module.exports = Footer;