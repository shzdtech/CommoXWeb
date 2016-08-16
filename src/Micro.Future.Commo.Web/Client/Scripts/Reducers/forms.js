import formObject from '../formObject';
import {CHANGE_FORM_TYPE, SELECT_FORM_ITEM, TYPE_FORM_ITEM, RESET_FORM} from '../Constants/ActionTypes';
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

            let newState = Object.assign({}, state, );
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

            let newState = Object.assign({}, state, );
            newState[typeName] = newList;
            return newState;
        }
        case RESET_FORM: {
            return formObject;
        }
        default:
            return state;
    }
}


export default forms;
