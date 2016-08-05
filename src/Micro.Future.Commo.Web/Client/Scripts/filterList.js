import {TEXT} from './Constants/FilterTypes';
import RequirementType from './Models/RequirementType';
import FilterProperty from './Models/FilterProperty';
import RuleType from './Models/RuleType';

export default [{
    id: 1,
    title: '订单属性',
    key: 'type',
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
            name: '补贴',
            value: RequirementType.Bonus
        }],
    multipleSelection: false
}, {
        id: 2,
        title: '企业类型',
        filterProperty: FilterProperty.Rule,
        ruleType: RuleType.Enterprise,
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
        ruleType: RuleType.Enterprise,
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
        filterProperty: FilterProperty.Rule,
        ruleType: RuleType.Enterprise,
        items: [],
        multipleSelection: false,
        type: TEXT
    },
    {
        id: 5,
        title: '货物类型',
        filterProperty: FilterProperty.Requirement,
        key: 'productType',
        items: [{
            id: 1,
            name: '有色金属',
            value: '有色金属'
        }, {
                id: 2,
                name: '化工',
                value: '化工'
            }, {
                id: 3,
                name: '其他',
                value: '其他'
            }]
    }, {
        id: 6,
        title: '货物名称',
        filterProperty: FilterProperty.Requirement,
        key: 'productName',
        items: [{
            id: 1,
            name: '铜',
            value: '铜'
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
        id: 7,
        title: '货物规格',
        key: 'productSpecification',
        filterProperty: FilterProperty.Requirement,
        items: [],
        type: TEXT
    },
    {
        id: 8,
        title: '货物单价',
        key: 'productPrice',
        filterProperty: FilterProperty.Requirement,
        items: [],
        type: TEXT
    },
    {
        id: 9,
        title: '货物数量',
        key: 'productQuantity',
        filterProperty: FilterProperty.Requirement,
        items: [],
        type: TEXT
    },
    {
        id: 10,
        title: '货物单位',
        key: 'productUnit',
        filterProperty: FilterProperty.Requirement,
        items: [{
            id: 1,
            name: '千克',
            value: '千克'
        }, {
                id: 2,
                name: '吨',
                value: '吨'
            }, {
                id: 3,
                name: '千吨',
                value: '千吨'
            }]
    }

];