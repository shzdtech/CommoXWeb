import React from 'react';

class Input extends React.Component {
  constructor() {
    super();
    this.changeValue = this.changeValue.bind(this);
  }

  render() {
    const {info} = this.props;
    let requiredNotation = null;
    if (info.isRequired) {
      requiredNotation = <span className="required"></span>;
    }
    let input =  <input
        type={info.type}
        placeholder={info.placeholder}
        value={info.value}
        className={ 'form-control'}
        onChange={this.changeValue}
        />
    if (info.type === 'file') {
      input = <input
        type={info.type}
        placeholder={info.placeholder}
        className={ 'form-control'}
        onChange={this.changeValue}
        files={info.file}
        />
    }

    return <div className='input-container'>
      <label className="input_label" htmlFor={info.label}>
        <span className="label_text">{info.label}</span>
      </label>
      {input}
      {requiredNotation}
      <span className='description'>{info.sufix}</span>
      <span className='error'>{info.labelError}</span>
      {this.props.children}
    </div>
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

module.exports = Input;