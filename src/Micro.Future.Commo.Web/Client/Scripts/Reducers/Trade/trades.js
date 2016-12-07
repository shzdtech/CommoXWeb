import {FETCH_TRADE_BAY_TYPE_SUCCESS,
    UPLOAD_ORDER_IMAGES_SUCCESS,
    UPDATE_TRADE_STATE_SUCCESS,
    UPDATE_ORDER_STATE_SUCCESS,
    DELETE_ORDER_IMAGE_SUCCESS} from '../../Constants/ActionTypes';

const trades = (state = [], action) => {
    switch (action.type) {
        case FETCH_TRADE_BAY_TYPE_SUCCESS:
            return action.trades;
        case UPDATE_TRADE_STATE_SUCCESS: {
            return state.filter((t) => { return t.tradeId !== action.tradeId });
        }
        case UPDATE_ORDER_STATE_SUCCESS: {
            return state.map((t) => {
                if (t.tradeId === action.tradeId) {
                    let newt = Object.assign({}, t);
                    newt.orders = t.orders.map((o) => {
                        if (o.orderId === action.orderId) {
                            let newOrder = Object.assign({}, o, { orderStateId: o.orderStateId + 1 });
                            return newOrder;
                        } else {
                            return o;
                        }
                    });
                    return newt;
                } else {
                    return t;
                }
            });
        }
        case DELETE_ORDER_IMAGE_SUCCESS: {
            return state.map((t) => {
                if (t.tradeId === action.tradeId) {
                    let newt = Object.assign({}, t);
                    newt.orders = t.orders.map((o) => {
                        if (o.orderId === action.orderId) {
                            let newOrder = Object.assign({}, o, { orderImages: o.orderImages.filter((oi) => { return oi.imageId !== action.orderImageId }) });
                            return newOrder;
                        } else {
                            return o;
                        }
                    });
                    return newt;
                } else {
                    return t;
                }
            });
        }
        case UPLOAD_ORDER_IMAGES_SUCCESS: {
            return state.map((t) => {
                if (t.tradeId === action.tradeId) {
                    let newt = Object.assign({}, t);
                    newt.orders = t.orders.map((o) => {
                        if (o.orderId === action.orderId) {
                            let newOrder = Object.assign({}, o, { orderImages: [...o.orderImages, ...action.orderImages] });
                            return newOrder;
                        } else {
                            return o;
                        }
                    });
                    return newt;
                } else {
                    return t;
                }
            });
        }
        default:
            return state;
    }
}

export default trades;