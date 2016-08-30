import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Input from './Input';

class ChangePassword extends React.Component {
    constructor() {
        super();
    }

    render() {
        
        let inputs = this.props.forms.map((l) => {
            return  <Input info={l} onChangeForm={this.props.onChangeForm} />
        })
        return <div className='change-password-container'>
            {inputs}
            <div className='change-password-operators'>
                <span className='btn submit' onClick={()=>{}}>提交</span>
            </div>
        </div>
    }
}

module.exports = ChangePassword;