import React from 'react';
import Input from './Input';

class EmailVerfication extends React.Component {
  constructor() {
    super();
    this.changeValue = this.changeValue.bind(this);
  }

  render() {

    return <Input {...this.props}>
        <span className='btn'>获取验证码</span>
    </Input>
  }

  changeValue(e) {
    console.log(e.target.value);
    let value = e.target.value;
    if (this.props.info.type === 'file') {
      let file = $(e.target).get(0).files
      this.props.onChangeForm(this.props.info.key, Object.assign({}, this.props.info, { file: file, value: value }));
    } else {
      this.props.onChangeForm(this.props.info.key, Object.assign({}, this.props.info, { value: value }));
    }
  }
}

module.exports = EmailVerfication;