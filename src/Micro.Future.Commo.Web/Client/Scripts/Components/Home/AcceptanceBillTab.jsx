import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';

class AcceptanceBillTab extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchAcceptanceList();
    }

    render() {
        let {acceptanceList} = this.props;
        let list = acceptanceList.map((acceptance) => {
            return <tr key={acceptance.acceptanceId}>
                <td className='left'>{acceptance.bankName}</td>
                <td>{acceptance.amount}</td>
                <td>{acceptance.acceptanceType}</td>
                <td>{acceptance.drawTime}</td>
                <td>{acceptance.dueDate}</td>
                <td>{acceptance.yearSubsidies}%</td>
                <td>{acceptance.subsidies}%</td>
            </tr>
        });
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
                                年化贴息(%)
                            </td>
                            <td>
                                贴息(%)
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

module.exports = AcceptanceBillTab;