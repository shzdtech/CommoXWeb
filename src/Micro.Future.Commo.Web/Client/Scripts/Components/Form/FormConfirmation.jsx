import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Filter from '../Filter';
import InputFilter from '../InputFilter';
import {TEXT} from '../../Constants/FilterTypes';
import Category from '../../Models/Category';
import RequirementType from '../../Models/RequirementType';
import {addRequirement} from '../../Actions/RequirementActions';

class FomrConfirmation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {main, selectedType, buy, sell, subsidy} = this.props.forms;

        let list = null;
        if (selectedType === RequirementType.Buy) {
            list = buy;
        } else if (selectedType === RequirementType.Sell) {
            list = sell;
        } else if (selectedType === RequirementType.Subsidy) {
            list = subsidy
        }
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
                                return r.value !== undefined && r.value !== null && r.value !== '' ?
                                    <div key={r.id} className='form-item'>
                                        <span className='form-item-title'>{r.title}</span>
                                        <span className='form-item-value'>{r.value}</span>
                                    </div> : null;
                            } else {

                                let values = r.items.filter((item) => { return item.selected; }).map((i) => { return i.value; });
                                return values.length > 0 ? <div key={r.id} className='form-item'>
                                    <span className='form-item-title'>{r.title}</span>
                                    <span className='form-item-value'>{values}</span>
                                </div> : null;
                            }
                        }) }
                    </div>
                </div>
            }
            return null;
        });

        return <div className='form-confirm'>
            <div className='form-content-group'>
                <div className='title'>订单属性</div>
                <div className='form-item-list'>
                    <div className='form-item'>
                        <span className='form-item-title'>订单属性</span>
                        <span className='form-item-value' >{selectedType === 1 ? '采购' : selectedType === 2 ? '销售' : '购销'}</span>
                    </div>
                </div>
            </div>
                {view}
                <div className="operators">
                <a className='submit' onClick={() => this.props.onSubmitForm(list, selectedType) }>我同意提交需求>></a>
                <Link to='/addRequirement' className='calloff'>返回</Link></div>
        </div>

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        forms: state.forms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitForm: (list, selectedType) => {
            dispatch(addRequirement(list, selectedType));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FomrConfirmation);