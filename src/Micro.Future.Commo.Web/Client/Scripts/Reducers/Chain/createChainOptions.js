import {
    SELECT_CREATE_CHAIN_OPTION_ITEM,
    TYPE_CREATE_CHAIN_OPTION_ITEM,
    RESET_CREATE_CHAIN_OPTION_FORM
} from '../../Constants/ActionTypes';
import {TEXT} from '../../Constants/FilterTypes';

let defaultOptions = [
    {
        id: 1,
        title: '固定长度？',
        key: 'fixedLength',
        placeholder: '如需要固定长度，请输入长度',
        type: TEXT
    },
    {
        id: 2,
        title: '固定位置',
        key: 'fixedPosition',
        items: [{
            id: 1,
            name: '是',
            value: true
        }]
    }, {
        id: 3,
        title: '最大长度',
        key: 'maxLength',   
        placeholder: '如需要设置最大长度，请输入最大长度',
        type: TEXT
    }]

const formItem = (state = {}, action) => {
    switch (action.type) {
        case SELECT_CREATE_CHAIN_OPTION_ITEM: {
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

const createChainOptions = (state = defaultOptions, action) => {
    switch (action.type) {
        case SELECT_CREATE_CHAIN_OPTION_ITEM: {
            let newList = state.map((f) => {
                if (f.id === action.formItem.id) {
                    let items = f.items.map((i) => {
                        return formItem(i, action);
                    });
                    return Object.assign({}, f, { items: items });
                } else {
                    return f;
                }
            });

            return newList;
        }
        case TYPE_CREATE_CHAIN_OPTION_ITEM: {
            let newList = state.map((f) => {
                if (f.id === action.formItem.id) {
                    return Object.assign({}, f, { value: action.value });
                } else {
                    return f;
                }
            });
            return newList;
        }
        case RESET_CREATE_CHAIN_OPTION_FORM: {
            return defaultOptions;
        }
        default:
            return state;
    }
}


export default createChainOptions;
