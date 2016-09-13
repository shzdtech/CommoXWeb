import React from 'react';
import Input from './Input';
import validateEmail from '../../Util/validateEmail';

class EmailVerfication extends React.Component {
    constructor() {
        super();
        this.tick = this.tick.bind(this);
        this.onClickGetVerficationCode = this.onClickGetVerficationCode.bind(this);
    }

    render() {
        let isValidEmail = validateEmail(this.props.info.value);
        let text = '获取验证码'
        return <Input {...this.props}>
            <span className={'btn ' + (!isValidEmail ? 'disabled' : '') } onClick={isValidEmail && this.onClickGetVerficationCode} ref='getVerficationCode'>{text}</span>
        </Input>
    }

    onClickGetVerficationCode() {
        if (!$(this.refs.getVerficationCode).hasClass('disabled')) {
            this.tick();
            this.props.getVerficationCode(this.props.info.value);
        }
    }

    tick() {
        var btn = this.refs.getVerficationCode;
        let tickCount = 10;
        $(btn).addClass('disabled');
        let ticker = setInterval(() => {
            $(btn).text('获取验证码(' + tickCount + ')')
            if (tickCount === 0) {
                clearInterval(ticker);
                $(btn).text('获取验证码');
                $(btn).removeClass('disabled');
            }
            tickCount--;
        }, 1000)
    }
}

module.exports = EmailVerfication;