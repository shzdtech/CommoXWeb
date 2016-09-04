import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class FormItem extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {formItem} = this.props;
        return <div className='form-item'>
            <span className='title'>{formItem.title + ':'}</span>
            <div className='items'>
                {formItem.items.map((item) => {
                    return <div key={item.id}>
                        <a className={item.selected ? 'item active' : 'item'} onClick={()=>this.props.onFormItemSelected(formItem, item)}>
                            <span>{item.name}</span>
                        </a>
                    </div>;
                }) }
            </div>
        </div>
    }
}

module.exports = FormItem;