import React, {PropTypes} from 'react';

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

export default FormType;