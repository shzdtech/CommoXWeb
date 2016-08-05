import {TEXT} from './Constants/FilterTypes';
import RequirementType from './Models/RequirementType';
import FilterProperty from './Models/FilterProperty';

export default [{
    id: 1,
    title: '订单属性',
    key: 'requirementType',
    filterProperty: FilterProperty.Requirement,
    items: [{
        id: 1,
        name: '出资',
        value: RequirementType.Buy
    }, {
            id: 2,
            name: '出货',
            value: RequirementType.Sell
        }, {
            id: 3,
            name: '出钱补贴',
            value: RequirementType.Bonus
        }, {
            id: 4,
            name: '商业承兑',
            value: RequirementType.Acceptance
        }],
    multipleSelection: false
}, {
        id: 2,
        title: '企业类型',
        filterProperty: FilterProperty.Rule,
        items: [{
            id: 1,
            name: '国有企业'
        }, {
                id: 2,
                name: '私有企业',
                value: '私有企业'
            }, {
                id: 3,
                name: '外商独资',
                value: '外商独资'
            }, {
                id: 4,
                name: '中外合资',
                value: '中外合资'
            }, {
                id: 5,
                name: '港澳独资',
                value: '港澳独资'
            }],
        multipleSelection: true
    },
    {
        id: 3,
        title: '注册资本',
        filterProperty: FilterProperty.Rule,
        items: [{
            id: 1,
            name: '100万以内',
            value: '100万以内'
        }, {
                id: 2,
                name: '100万至1000万',
                value: '100万至1000万'
            }, {
                id: 3,
                name: '1000万以上',
                value: '1000万以上'
            }],
        multipleSelection: true
    },
    {
        id: 4,
        title: '注册地',
        items: [],
        multipleSelection: false,
        type: TEXT
    }, {
        id: 5,
        title: '货物名称',
        filterProperty: FilterProperty.Requirement,
        key: 'productName',
        items: [{
            id: 1,
            name: '铜',
            value:'铜'
        }, {
                id: 2,
                name: '铁',
                value: '铁'
            }, {
                id: 3,
                name: '锌',
                value: '锌'
            }, {
                id: 4,
                name: '铝',
                value: '铝'
            }],
        multipleSelection: true
    },
    {
        id: 6,
        title: '货物数量',
        items: [],
        type: TEXT
    }
];