import React from 'react';
import Input from './Input';
import EmailVerfication from './EmailVerfication';
import Dropdown from './Dropdown';

class Register extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(){
            this.props.componentRendered && this.props.componentRendered();
    }

    render() {
        let list = [];
        let disabled = false;
        let errorCount = 0;
        const {enterpriseInfo, onChangeEnterpriseForm, onSubmitEnterpriseForm, getVerficationCode} = this.props;
        if(enterpriseInfo['password'] && enterpriseInfo['confirmPassword'] && enterpriseInfo['password'].value !== enterpriseInfo['confirmPassword'].value){
            enterpriseInfo['confirmPassword'].labelError = '密码不一致';
            errorCount++;
        }else if(enterpriseInfo['confirmPassword']){
             enterpriseInfo['confirmPassword'].labelError = null;
        }

        for (var key in enterpriseInfo) {
            let info = enterpriseInfo[key];
            if((info.isRequired && (info.value === undefined ||　info.value === null || info.value === '')) || errorCount > 0){
                disabled = true;
            }
            if (info.type === 'text' || info.type === 'date' || info.type === 'file' || info.type === 'number' || info.type === 'password') {
                if(info.key === 'emailAddress'){
                    list.push(<EmailVerfication info={info} onChangeForm={onChangeEnterpriseForm} key={key} getVerficationCode={getVerficationCode} />)
                }else{
                    list.push(<Input key={key} info={info} onChangeForm={onChangeEnterpriseForm} />);
                }
            } else if (info.type === 'select') {
                list.push(<Dropdown key={key} info={info} onChangeForm={onChangeEnterpriseForm} />);
            }
        }
        return <div>
            {list}
            <div className='register-operators'>
                <span className={'btn btn-large submit ' + (disabled ? 'disabled' : '')}  onClick={()=>{if(!disabled){onSubmitEnterpriseForm(enterpriseInfo)}}}>提交</span>
                <span className='btn btn-large calloff' >取消</span>
            </div>
        </div>
    }
}

module.exports = Register;