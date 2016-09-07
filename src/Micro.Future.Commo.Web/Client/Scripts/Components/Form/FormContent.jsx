import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import InputFormItem from './InputFormItem';
import FormItem from './FormItem';
import Category from '../../Models/Category';
import {TEXT} from '../../Constants/FilterTypes';
import {Link} from 'react-router';

class FormContent extends React.Component {

    render() {

        const {list, selectedType, onFormItemSelected, onFormItemTyped} = this.props;

        let capitals = [];
        let products = [];
        let invoices = [];
        let contracts = [];
        let enterprises = [];

        let disabled = false;

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
                                if (r.isRequired && (r.value === undefined || r.value === null || r.value === '')) {
                                    disabled = true;
                                }
                                if (r.valueType === 'number' && (r.value === undefined || r.value === null || !$.isNumeric(r.value))) {
                                    disabled = true;
                                }
                                return <InputFormItem key={r.id} formItem = {r} onFormItemTyped={onFormItemTyped}/>;
                            }
                            if (r.isRequired && r.items.filter((f) => { return f.selected }).length === 0) {
                                disabled = true;
                            }
                            return <FormItem key={r.id} formItem = {r} onFormItemSelected={onFormItemSelected} />;
                        }) }
                    </div>
                </div>
            }
            return null;
        });

        return <div className='form-content'>
            {view}
            <div className="operators">
                <a className={'btn btn-large ' + (disabled ? 'disabled' : '') }
                    onClick={() => { !disabled && this.props.transferToConfirm() } }>确定</a>
                <span className='btn btn-large calloff' onClick={() => this.props.resetForm() }>取消</span></div>
        </div>
    }
}

module.exports = FormContent;