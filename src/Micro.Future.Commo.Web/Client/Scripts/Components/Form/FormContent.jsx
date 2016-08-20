import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {addRequirement, resetForm} from '../../Actions';
import InputFormItem from './InputFormItem';
import FormItem from './FormItem';
import FilterProperty from '../../Models/FilterProperty';
import Category from '../../Models/Category';
import {TEXT} from '../../Constants/FilterTypes';
import {Link} from 'react-router';

class FormContent extends React.Component {
    render() {

        const {list, selectedType} = this.props;

        let capitals = [];
        let products = [];
        let invoices = [];
        let contracts = [];
        let enterprises = [];

        list.forEach((l) => {
            if (l.category === Category.Capital) {
                capitals.push(l);
            } else if (l.category === Category.Product) {
                products.push(l);
            } else if (l.category === Category.Contract) {
                contracts.push(l);
            } else if (l.category === Category.Invoice) {
                invoices.push(l);
            } else if (l.category === Category.Enterprise) {
                enterprises.push(l);
            }
        });

        let viewModel = [{ title: Category.Contract, items: contracts },
            { title: Category.Capital, items: capitals },
            { title: Category.Product, items: products },
            { title: Category.Invoice, items: invoices },
            { title: Category.Enterprise, items: enterprises }
        ];

        let view = viewModel.map((m) => {
            if (m.items && m.items.length > 0) {
                return <div key={m.title} className='form-content-group'>
                    <div className='title'>{m.title}</div>
                    <div className='form-item-list'>
                        {m.items.map(function (r) {
                            if (r.type === TEXT) {
                                return <InputFormItem key={r.id} formItem = {r} />;
                            }
                            return <FormItem key={r.id} formItem = {r} />;
                        }) }
                    </div>
                </div>
            }
            return null;
        });

        return <div className='form-content'>
            {view}
            <div className="operators">
                <Link to="/formConfirm" className='btn'>确定</Link>
                <span className='btn calloff' onClick={() => this.props.resetForm() }>取消</span></div>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitForm: (list, selectedType) => {
            dispatch(addRequirement(list, selectedType));
        },
        resetForm: () => {
            dispatch(resetForm());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FormContent);