import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {changeFormType} from '../../Actions';


class FormType extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { main, selectedType, changeFormType } = this.props;

        return <div className='form-type'>
            <span className='title'>{main.title + ':'}</span>
            <div className='items'>
                {main.items.map((item) => {
                    return <div key={item.id}>
                        <a className={selectedType === item.value ? 'item active' : 'item'} onClick={() => changeFormType(item.value) }>
                            <span>{item.name}</span>
                        </a>
                    </div>;
                }) }
            </div>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFormType: (formType) => {
            dispatch(changeFormType(formType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormType);