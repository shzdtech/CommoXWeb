import React from 'react';

class Input extends React.Component {
  constructor() {
    super();
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
        />
    </div>
  }
}

module.exports = Input;