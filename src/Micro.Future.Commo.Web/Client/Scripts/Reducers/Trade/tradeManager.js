import {SELECT_TRADE_STATE, SET_SELECT_ENTERPRISE_TRADE, SET_SELECT_ADMIN_TRADE} from '../../Constants/ActionTypes';

let initTradeStates = {
    title: '交易状态',
    isMine: false,
    items: [{
        id: 1,
        name: '签署合同',
        value: 1,
        selected: true
    }, {
            id: 2,
            name: '支付资金',
            value: 2
        }, {
            id: 3,
            name: '交付货物',
            value: 3
        },{
            id: 4,
            name: '开具发票',
            value: 4
        }, {
            id: 5,
            name: '支付尾款',
            value: 5
        }, {
            id: 6,
            name: '交易完成',
            value: 6
        }]
};

const tradeManager = (state = initTradeStates, action) => {
    switch (action.type) {
        case SELECT_TRADE_STATE: {
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
        case SET_SELECT_ENTERPRISE_TRADE:{
            return Object.assign({}, state, {isMine: true});
        }
        case SET_SELECT_ADMIN_TRADE:{
            return Object.assign({}, state, {isMine: false});
        }
        default:
            return state;
    }
}

export default tradeManager;