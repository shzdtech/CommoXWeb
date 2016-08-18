import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Filter from '../Filter';
import InputFilter from '../InputFilter';
import {TEXT} from '../../Constants/FilterTypes';
import FilterProperty from '../../Models/FilterProperty';
import RequirementType from '../../Models/RequirementType';
import {addRequirement} from '../../Actions';

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

        let requirements = [];
        let rules = [];

        list.forEach((l) => {
            if (!l.selected) {
                if (l.filterProperty === FilterProperty.Requirement) {
                    requirements.push(l);
                } else if (l.filterProperty === FilterProperty.Rule) {
                    rules.push(l);
                }
            }
        });

        let requirementList = null;
        let ruleList = null;
        let getItem = (r) => {
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
        }
        if (requirements.length > 0) {
            requirementList = <div className='form-content-group'>
                <div className='title'>需求属性</div>
                <div className='form-item-list'>
                    {
                        requirements.map((r) => {
                            return getItem(r);
                        })
                    }
                </div>
            </div>
        }

        if (rules.length > 0) {
            ruleList = <div className='form-content-group'>
                <div className='title'>附加需求</div>
                <div className='form-item-list'>{
                    rules.map((r) => {
                        return getItem(r);
                    }) }
                </div>
            </div>
        }

        return <div className='form-confirm'>
            <div className='form-content-group'>
                <div className='title'>订单属性</div>
                <div className='form-item-list'>
                    <div className='form-item'>
                        <span className='form-item-title'>订单属性</span>
                        <span className='form-item-value' >{selectedType === 1 ? '出资' : selectedType === 2 ? '出货' : '补贴'}</span>
                    </div>
                </div>
            </div>
            requirements.length > 0 ? {requirementList} : null
            rules.length > 0 ? {ruleList} : null
            {requirements.length > 0 ? <div className="operators">
                <a className='submit' onClick={() => this.props.onSubmitForm(list, selectedType) }>我同意提交需求>></a>
                <Link to='/addRequirement' className='calloff'>返回</Link></div> : null}
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