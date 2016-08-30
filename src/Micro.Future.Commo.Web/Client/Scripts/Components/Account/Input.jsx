import React from 'react';

class Input extends React.Component {
  constructor() {
    super();
    this.changeValue = this.changeValue.bind(this);
  }

  render() {
    const {info} = this.props;
    return <div className='input-container'>
      <label className="input_label" htmlFor={info.label}>
        <span className="label_text">{info.label}</span>
      </label>
      <input
        type={info.type}
        placeholder={info.placeholder}
        value={info.value}
        className={ 'form-control ' + info.length}
        onChange={this.changeValue}
        />
    </div>
  }

  changeValue(e){
        console.log(e.target.value);
        this.props.onChangeForm(this.props.info.key, Object.assign({}, this.props.info, {value: e.target.value}));
    }
}

module.exports = Input;