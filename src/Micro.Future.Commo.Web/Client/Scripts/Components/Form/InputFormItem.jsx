import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {typeFormItem} from '../../Actions';


class InputFormItem extends React.Component {
    constructor() {
        super();
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    render() {
        let {formItem} = this.props;
        if(!formItem.value){
            formItem.value = '';
        }
        return <div className='form-item'>
            <label className="input_label" htmlFor={formItem.title}>
                <span className="label_text">{formItem.title + ':'}</span>
            </label>
            <input type="text" className="form-control" value={formItem.value} placeholder={formItem.title}  onChange={(e) => { this.handleValueChange(e) } }/>
        </div>
    }

    handleValueChange(e) {
        this.props.onFormItemTyped(this.props.formItem, e.target.value);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFormItemTyped: (formItem, value) => {
            dispatch(typeFormItem(formItem, value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputFormItem);