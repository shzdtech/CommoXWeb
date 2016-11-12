import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Input from '../Account/Input';
import DateInput from '../Account/DateInput';
import Dropdown from '../Account/Dropdown';

class AcceptanceManager extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchAcceptance();
    }

    render() {
        let list = [];
        let disabled = false;

        const {acceptanceInfo, onSubmit, onChangeForm, acceptanceList} = this.props;

        for (var key in acceptanceInfo) {
            let info = acceptanceInfo[key];
            if ((info.isRequired && (info.value === undefined || info.value === null || info.value === ''))) {
                disabled = true;
            }
            if (info.type === 'text' || info.type === 'number' || info.type === 'password') {
                list.push(<Input key={key} info={info} onChangeForm={onChangeForm} />);
            } else if(info.type === 'date'){
                 list.push(<DateInput key={key} info={info} onChangeForm={onChangeForm} />);
            }else if (info.type === 'select') {
                list.push(<Dropdown key={key} info={info} onChangeForm={onChangeForm} />);
            }
        }

        let rows = acceptanceList.map((acceptance) => {
            return <tr key={acceptance.acceptanceId}>
                <td className='left'>{acceptance.bankName}</td>
                <td>{acceptance.amount}万</td>
                <td>{acceptance.acceptanceType === 1 ? '电票' : '纸票'}</td>
                <td>{new Date(acceptance.drawTime).toLocaleDateString()}</td>
                <td>{new Date(acceptance.dueDate).toLocaleDateString()}</td>
                <td>{acceptance.yearSubsidies}%</td>
                <td>{acceptance.subsidies}%</td>
                <td><span className='btn' onClick={() => this.props.onDelete(acceptance.acceptanceId) }>删除</span></td>
            </tr>
        });

        return <div>
            {list}
            <div className='register-operators'>
                <span className={'btn btn-large submit ' + (disabled ? 'disabled' : '') }  onClick={() => { if (!disabled) { onSubmit(acceptanceInfo) } } }>提交</span>
                <span className='btn btn-large calloff' >取消</span>
            </div>
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
                            <td>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

module.exports = AcceptanceManager;