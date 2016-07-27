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
    title: '企业类型',
    items: [{
        id: 1,
        name: '国有企业'
    }, {
        id: 2,
        name: '私有企业'
    }, {
        id: 3,
        name: '外商独资'
    }, {
        id: 4,
        name: '中外合资'
    }, {
        id: 5,
        name: '港澳独资'
    }],
    multipleSelection: true
},
{
    id: 3,
    title: '注册资本',
    items: [{
        id: 1,
        name: '100万以内'
    },{
        id: 2,
        name: '100万至1000万'
    },{
        id: 3,
        name: '1000万以上'
    }],
    multipleSelection: true
},
{
    id: 4,
    title: '注册地',
    items:[],
    multipleSelection: false,
    type: TEXT
},
{
    id: 5,
    title: '开票量',
    items:[],
    multipleSelection: false
}
];