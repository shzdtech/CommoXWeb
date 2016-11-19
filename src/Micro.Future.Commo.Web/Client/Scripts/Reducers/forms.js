import formObject from '../formObject';
import {CHANGE_FORM_TYPE, SELECT_FORM_ITEM, TYPE_FORM_ITEM, RESET_FORM, CREATE_CHAIN_WITH_NEW_REQUIREMENT, SET_PAYMENT_METHOD} from '../Constants/ActionTypes';
import {LABEL} from '../Constants/FilterTypes';

import RequirementType from '../Models/RequirementType';

const getSelectedFormType = (selectedType) => {
    let typeName = null;
    if (selectedType === RequirementType.Buy) {
        typeName = 'buy';
    } else if (selectedType === RequirementType.Sell) {
        typeName = 'sell';
    } else if (selectedType === RequirementType.Subsidy) {
        typeName = 'subsidy'
    }
    return typeName;
};

const formItem = (state = {}, action) => {
    switch (action.type) {
        case SELECT_FORM_ITEM: {
            if (state.id === action.item.id) {
                return Object.assign({}, state, { selected: !state.selected });
            } else {
                return Object.assign({}, state, { selected: false });
            }
        }
        default:
            return state;
    }
};

const forms = (state = formObject, action) => {
    switch (action.type) {
        case CHANGE_FORM_TYPE: {
            return Object.assign({}, state, { selectedType: action.formType });
        }
        case SELECT_FORM_ITEM: {
            let typeName = getSelectedFormType(state.selectedType);
            let newList = state[typeName].map((f) => {
                if (f.id === action.formItem.id) {
                    let items = f.items.map((i) => {
                        return formItem(i, action);
                    });
                    return Object.assign({}, f, { items: items });
                } else {
                    return f;
                }
            });

            let newState = Object.assign({}, state);
            newState[typeName] = newList;
            return newState;
        }
        case TYPE_FORM_ITEM: {
            let typeName = getSelectedFormType(state.selectedType);
            let newList = state[typeName].map((f) => {
                if (f.id === action.formItem.id) {
                    return Object.assign({}, f, { value: action.value });
                } else {
                    return f;
                }
            });

            let newState = Object.assign({}, state);
            newState[typeName] = newList;
            return newState;
        }
        case RESET_FORM: {
            return formObject;
        }
        case CREATE_CHAIN_WITH_NEW_REQUIREMENT: {
            return Object.assign({}, state, { createFor: 1 })
        }
        case SET_PAYMENT_METHOD: {
            let paymentType = null;
            switch (action.paymentTypeId) {
                case 1:
                    paymentType = '电汇（现金）';
                    break;
                case 2:
                    paymentType = '银行电子汇票';
                    break;
                case 3:
                    paymentType = '信用证';
                    break;
                case 4: 
                    paymentType = '商业承兑汇票';
                    break;
                default: 
                    paymentType = null;
                    break;

            }

            let newState = Object.assign({}, state);
            let setPaymentType = (r)=>{
                return r.map((i) => {
                    if(i.key === 'paymentType'){
                        return Object.assign({}, i, {value: action.paymentTypeId, label: paymentType, type: LABEL});
                    }
                    else{
                        return i;
                    }
                });
            }

            newState.buy = setPaymentType(newState.buy);
            newState.sell = setPaymentType(newState.sell);
            newState.subsidy = setPaymentType(newState.subsidy);

            return newState;
        }
        default:
            return state;
    }
}


export default forms;
