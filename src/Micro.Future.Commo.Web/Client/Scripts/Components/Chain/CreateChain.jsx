import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import SelectRequirementsPopup from './SelectRequirementsPopup';
import InputFormItem from '../Form/InputFormItem';
import FormItem from '../Form/FormItem';
import {TEXT} from '../../Constants/FilterTypes'

class CreateChain extends React.Component {
    constructor() {
        super();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filters.filter((f) => { return f.selected }).length !== this.props.filters.filter((f) => { return f.selected }).length) {
            this.searchByFilter();
        }
    }

    searchByFilter() {
        let searchCriteria = {
        };
        this.props.filters.forEach((f) => {
            if (f.selected) {
                if (f.key === 'tradeAmount') {
                    searchCriteria['startTradeAmount'] = parseFloat(f.selectedItems[0].value) * 0.8;
                    searchCriteria['endTradeAmount'] = parseFloat(f.selectedItems[0].value) * 1.2;
                } else {
                    let values = f.selectedItems.map((i) => { return i.value; });
                    searchCriteria[f.key] = values.join(',');
                }
            }
        });

        this.props.createChainWithSelectAction(searchCriteria);
    }

    render() {
        let {filters, cancelSelectRequirement, selectRequirementAction,
            createChainWithSelectAction, selectRequirement, createChainState, createChainOptions,
            onCreateChainOptionTyped, onCreateChainOptionSelected} = this.props;
        let overlay = <div className="overlay"></div>

        let forceCreate = false;
        let fixedPosition = false;
        createChainOptions.forEach((o) => {
            if (o.key === 'forceCreate') {
                forceCreate = o.value;
            }

            if (o.key === 'fixedPosition') {
                let item = o.items.filter((i) => { return i.selected });
                fixedPosition = item.length > 0 && item[0].value;
            }
        });

        let popup = null;
        if (selectRequirement && selectRequirement.requirements && selectRequirement.requirements.length > 0) {
            popup = <SelectRequirementsPopup
                selectRequirement={selectRequirement}
                filters={filters}
                cancelSelectRequirement={cancelSelectRequirement}
                selectRequirementAction={selectRequirementAction}/>
        }

        let createChainOptionsView = null;
        if (!forceCreate) {
            createChainOptionsView = createChainOptions.map((r) => {
                if (r.key === 'forceCreate') {
                    return null;
                }

                if (r.type === TEXT) {
                    return <InputFormItem key={r.id} formItem = {r} onFormItemTyped={onCreateChainOptionTyped}/>;
                }

                return <FormItem key={r.id} formItem = {r} onFormItemSelected={onCreateChainOptionSelected} />;
            });
        }

        let list = createChainState.map((s, index) => {
            if (s.type === 1) {
                let r = s.requirement;
                return <div key={index} className="new-chain-node">
                    <div className='requirement'>
                        <div className='title'>{r.enterpriseName}</div>
                        {r.requirementId ? <div className='title'><span>需求ID: </span><span>{r.requirementId}</span></div> : null}
                        {r.type ? <div className='title'><span className='title'>需求类型：</span><span>{r.type === 1 ? '采购' : (r.type === 2 ? '销售' : '购销') }</span></div> : null}
                        {r.paymentAmount ? <div className='sub-title'><span>资金金额: </span><span>{r.paymentAmount}</span></div> : null}
                        {r.paymentDateTime ? <div className='sub-title'><span>货款支付时间: </span><span>{r.paymentDateTime}</span></div> : null}
                        {r.paymentType ? <div className='sub-title'><span>支付方式: </span><span>{r.paymentType}</span></div> : null}
                        {r.productPrice ? <div className='sub-title'><span>货物单价：</span><span>{r.productPrice}</span></div> : null}
                        {r.productName ? <div className='sub-title'><span>货物名称：</span><span>{r.productName}</span></div> : null}
                        {r.productQuantity ? <div className='sub-title'><span>货物数量：</span><span>{r.productQuantity}</span></div> : null}
                        {r.productUnit ? <div className='sub-title'><span>货物单位：</span><span>{r.productUnit}</span></div> : null}
                        {r.tradeAmount ? <div className='sub-title'><span>合同总金额：</span><span>{r.tradeAmount}</span></div> : null}
                    </div>
                    {overlay}
                    <div className="delete-icon glyphicon glyphicon-remove-sign" onClick={() => { this.props.removeChainNode(index) } }></div>
                </div>
            } else if (s.type === 2) {
                return <div key={index} className="new-chain-node">
                    <span className='glyphicon glyphicon-minus notation'></span>
                    {overlay}
                    <div className="delete-icon glyphicon glyphicon-remove-sign" onClick={() => { this.props.removeChainNode(index) } }></div>
                </div>
            } else {
                return <div key={index} className="new-chain-node">
                    <span className='glyphicon glyphicon-option-horizontal notation'></span>
                    {overlay}
                    <div className="delete-icon glyphicon glyphicon-remove-sign" onClick={() => { this.props.removeChainNode(index) } }></div>
                </div>
            }
        })

        return <div className='create-chain-container'>
            <div className='forms'>
                {createChainOptionsView}
            </div>
            <div className='create-chain-view'>
                <div className="actions">
                    <div className="btn" onClick={this.props.createRequirement}>创建</div>
                    <div className="btn" onClick={() => this.props.createChainWithSelectAction({}) }>选择</div>
                    { forceCreate || !fixedPosition ? null : <div className="btn" onClick={this.props.randomOne}>随机匹配一个</div>}
                    { forceCreate || !fixedPosition ? null : <div className="btn" onClick={this.props.randomMore}>随机匹配任意个</div>}
                </div>
                <div className='new-chain-list'>
                    {list}
                </div>
            </div>
            {popup}
            <div className='operators'>
                <a className={'btn btn-large ' }
                    onClick={() => { this.props.submitCreateChain(createChainState, createChainOptions) } }>确定</a>
            </div>
        </div>
    }
}

module.exports = CreateChain;