import {SELECT_CHAIN_TYPE} from '../../Constants/ActionTypes';

let initChainListType = {
    title: '匹配状态',
    items: [{
        id: 1,
        name: '未锁定',
        value: 0,
        selected: true
    }, {
            id: 2,
            name: '已锁定',
            value: 1
        }, {
            id: 3,
            name: '已确认',
            value: 2
        }]
};

const chainListManager = (state = initChainListType, action) => {
    switch (action.type) {
        case SELECT_CHAIN_TYPE: {
            return Object.assign({}, state, {
                items: state.items.map((item) => {
                    if (item.id === action.item.id) {
                        return Object.assign({}, item, { selected: true });
                    } else {
                        return Object.assign({}, item, { selected: false });
                    }
                })
            });
        }
        default:
            return state;
    }
}

export default chainListManager;