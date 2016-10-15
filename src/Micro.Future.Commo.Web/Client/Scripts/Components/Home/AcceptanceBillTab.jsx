import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';

var acceptanceBill = [{
    name: ''
}]

class AcceptanceBillTab extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div className='acceptance-bill-tab'>
            <div className='tab-title'>银行承兑汇票</div>

            <div className='container finance-list'>
                <table>
                    <thead>
                        <tr>
                            <td className='left'>
                                开票行
                            </td>
                            <td>
                                票面金额（单位：万）
                            </td>
                            <td>
                                票据种类
                            </td>
                            <td>
                                出票日期
                            </td>
                            <td>
                                到期日
                            </td>
                            <td>
                                年化贴息
                            </td>
                            <td>
                                贴息
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='left'>中国工商银行</td>
                            <td>1000</td>
                            <td>纸票</td>
                            <td>2016-10-10</td>
                            <td>2018-10-09</td>
                            <td>8.79%</td>
                            <td>1.2%</td>
                        </tr>
                         <tr>
                            <td className='left'>中国工商银行</td>
                            <td>1000</td>
                            <td>纸票</td>
                            <td>2016-10-10</td>
                            <td>2018-10-09</td>
                            <td>8%</td>
                            <td>1%</td>
                        </tr>
                         <tr>
                            <td className='left'>中国工商银行</td>
                            <td>1000</td>
                            <td>纸票</td>
                            <td>2016-10-10</td>
                            <td>2018-10-09</td>
                            <td>8%</td>
                            <td>1%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }
}

module.exports = AcceptanceBillTab;