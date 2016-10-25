import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Input from '../Account/Input';
import DropDown from '../Account/DropDown';

class FinanceManager extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(){
        this.props.fetchFinance()
    }

    render() {
        let list = [];
        let disabled = false;
        
        const {financeInfo, onSubmit, onChangeForm, financeInfoList} = this.props;

        for (var key in financeInfo) {
            let info = financeInfo[key];
            if ((info.isRequired && (info.value === undefined || 　info.value === null || info.value === ''))) {
                disabled = true;
            }
            if (info.type === 'text' || info.type === 'date' || info.type === 'number' || info.type === 'password') {
                list.push(<Input key={key} info={info} onChangeForm={onChangeForm} />);
            } else if (info.type === 'select') {
                list.push(<Dropdown key={key} info={info} onChangeEnterpriseForm={onChangeForm} />);
            }
        }

        let rows = financeInfoList.map((f) => {
            return <tr key={f.productId}>
                <td>{f.bankAddress}</td>
                <td>{f.productTerm} </td>
                <td>{f.productYield} </td>
                <td><span className='btn' onClick={()=> this.props.onDelete(f.productId)}>删除</span></td>
            </tr>
        })

        return <div>
            {list}
            <div className='register-operators'>
                <span className={'btn btn-large submit ' + (disabled ? 'disabled' : '') }  onClick={() => { if (!disabled) { onSubmit(financeInfo) } } }>提交</span>
                <span className='btn btn-large calloff' >取消</span>
            </div>
             <div className='container finance-list'>
             <table>
                    <thead>
                        <tr>
                            <td>银行所在地</td>
                            <td>产品期限(天)</td>
                            <td>年华收益率(%)</td>
                            <td></td>
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

module.exports = FinanceManager;