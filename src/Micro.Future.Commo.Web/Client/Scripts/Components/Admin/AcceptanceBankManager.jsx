import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Input from '../Account/Input';
import DateInput from '../Account/DateInput';
import Dropdown from '../Account/Dropdown';

class AcceptanceBankManager extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchAcceptanceBank();
    }

    render() {
        let list = [];
        let disabled = false;

        const {acceptanceBankInfo, onSubmit, onChangeForm, acceptanceBankList} = this.props;

        for (var key in acceptanceBankInfo) {
            let info = acceptanceBankInfo[key];
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

        let rows = acceptanceBankList.map((acceptance) => {
            return <tr key={acceptance.bankId}>
                <td className='left'>{acceptance.bankName}</td>
                <td>{acceptance.bankType === 1 ? '国股' : acceptance.acceptanceType === 2 ? '城商' : '农商'}</td>
                <td>{acceptance.bankPrice}%</td>
                <td>{acceptance.acceptanceType === 1 ? '大票' : '小票'}</td>
                <td><span className='btn' onClick={() => this.props.onDelete(acceptance.bankId) }>删除</span></td>
            </tr>
        });

        return <div>
            {list}
            <div className='register-operators'>
                <span className={'btn btn-large submit ' + (disabled ? 'disabled' : '') }  onClick={() => { if (!disabled) { onSubmit(acceptanceBankInfo) } } }>提交</span>
                <span className='btn btn-large calloff' >取消</span>
            </div>
            <div className='container finance-list'>
                <table>
                    <thead>
                        <tr>
                            <td className='left'>
                                贴票行
                            </td>
                            <td>
                               开票行类别
                            </td>
                            <td>
                                银行报价(贴现利率)
                            </td>
                            <td>
                                票据种类
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

module.exports = AcceptanceBankManager;