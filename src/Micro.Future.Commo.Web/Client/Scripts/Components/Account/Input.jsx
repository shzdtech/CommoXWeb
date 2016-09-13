import React from 'react';

class Input extends React.Component {
  constructor() {
    super();
    this.changeValue = this.changeValue.bind(this);
  }

  render() {
    const {info} = this.props;
    let requiredNotation = null;
    if(info.isRequired){
      requiredNotation = <span className="required"></span>;
    }
    return <div className='input-container'>
      <label className="input_label" htmlFor={info.label}>
        <span className="label_text">{info.label}</span>
      </label>
      <input
        type={info.type}
        placeholder={info.placeholder}
        value={info.value}
        className={ 'form-control'}
        onChange={this.changeValue}
        />
        {requiredNotation}
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