import {TEXT} from './Constants/FilterTypes';

export default [{
    id: 1,
    title: '订单属性',
    items: [{
        id: 1,
        name: '出资'
    }, {
        id: 2,
        name: '出货'
    }, {
        id: 3,
        name: '出钱补贴'
    }, {
        id: 4,
        name: '商业承兑'
    }],
    multipleSelection: false
}, {
    id: 2,
    title: '货物名称',
    items: [{
        id: 1,
        name: '铜'
    }, {
        id: 2,
        name: '铁'
    }, {
        id: 3,
        name: '锌'
    }, {
        id: 4,
        name: '铝'
    }],
    multipleSelection: true
},
 {
    id: 3,
    title: '货物数量',
    items: [],
    type: TEXT
}
];