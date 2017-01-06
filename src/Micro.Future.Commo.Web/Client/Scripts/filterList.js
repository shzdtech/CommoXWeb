import {TEXT} from './Constants/FilterTypes';
import RequirementType from './Models/RequirementType';
import FilterProperty from './Models/FilterProperty';
import RuleType from './Models/RuleType';
import products from './Models/Products';

export default [{
    id: 1,
    title: '订单属性',
    key: 'requirementType',
    filterProperty: FilterProperty.Requirement,
    items: [{
        id: 1,
        name: '采购',
        value: RequirementType.Buy
    }, {
            id: 2,
            name: '销售',
            value: RequirementType.Sell
        }, {
            id: 3,
            name: '购销',
            value: RequirementType.Subsidy
        }],
    multipleSelection: false
},
    //{
    //         id: 2,
    //         title: '企业类型',
    //         filterProperty: FilterProperty.Rule,
    //         ruleType: RuleType.Enterprise,
    //         items: [{
    //             id: 1,
    //             name: '国有企业'
    //         }, {
    //                 id: 2,
    //                 name: '私有企业',
    //                 value: '私有企业'
    //             }, {
    //                 id: 3,
    //                 name: '外商独资',
    //                 value: '外商独资'
    //             }, {
    //                 id: 4,
    //                 name: '中外合资',
    //                 value: '中外合资'
    //             }, {
    //                 id: 5,
    //                 name: '港澳独资',
    //                 value: '港澳独资'
    //             }],
    //         multipleSelection: false
    //     },
    //     {
    //         id: 3,
    //         title: '注册资本',
    //         filterProperty: FilterProperty.Rule,
    //         ruleType: RuleType.Enterprise,
    //         items: [{
    //             id: 1,
    //             name: '100万以内',
    //             value: '100万以内'
    //         }, {
    //                 id: 2,
    //                 name: '100万至1000万',
    //                 value: '100万至1000万'
    //             }, {
    //                 id: 3,
    //                 name: '1000万以上',
    //                 value: '1000万以上'
    //             }],
    //         multipleSelection: false
    //     },
    // {
    //     id: 4,
    //     title: '注册地',
    //     filterProperty: FilterProperty.Rule,
    //     ruleType: RuleType.Enterprise,
    //     items: [],
    //     multipleSelection: false,
    //     type: TEXT
    // },
   {
        id: 6,
        title: '货物名称',
        filterProperty: FilterProperty.Requirement,
        key: 'productName',
        parentFilterId: 5,
        parentItemId: 1,
        items: products
   },
    // {
    //     id: 7,
    //     title: '货物规格',
    //     parentFilterId: 1,
    //     parentItemId: 1,
    //     key: 'productSpecification',
    //     filterProperty: FilterProperty.Requirement,
    //     items: [],
    //     type: TEXT
    // },
    // {
    //     id: 8,
    //     title: '货物单价',
    //     key: 'productPrice',
    //     parentFilterId: 1,
    //     parentItemId: 1,
    //     filterProperty: FilterProperty.Requirement,
    //     items: [],
    //     type: TEXT
    // },
    // {
    //     id: 9,
    //     title: '货物数量',
    //     key: 'productQuantity',
    //     parentFilterId: 1,
    //     parentItemId: 1,
    //     filterProperty: FilterProperty.Requirement,
    //     items: [],
    //     type: TEXT
    // },
    // {
    //     id: 10,
    //     title: '货物单位',
    //     key: 'productUnit',
    //     parentFilterId: 1,
    //     parentItemId: 1,
    //     filterProperty: FilterProperty.Requirement,
    //     items: [{
    //         id: 1,
    //         name: '千克',
    //         value: '千克'
    //     }, {
    //             id: 2,
    //             name: '吨',
    //             value: '吨'
    //         }, {
    //             id: 3,
    //             name: '千吨',
    //             value: '千吨'
    //         }]
    // },
    {
        id: 11,
        title: '交易量',
        key: 'tradeAmount',
        filterProperty: FilterProperty.Requirement,
        parentFilterId: 1,
        parentItemId: 3,
        items: [],
        type: TEXT
    }
    // {
    //     id: 12,
    //     title: '货物类型',
    //     filterProperty: FilterProperty.Requirement,
    //     parentFilterId: 1,
    //     parentItemId: 2,
    //     key: 'productType',
    //     items: [{
    //         id: 1,
    //         name: '有色金属',
    //         value: '有色金属'
    //     }, {
    //             id: 2,
    //             name: '化工',
    //             value: '化工'
    //         }, {
    //             id: 3,
    //             name: '其他',
    //             value: '其他'
    //         }]
    // }, {
    //     id: 13,
    //     title: '货物名称',
    //     filterProperty: FilterProperty.Requirement,
    //     key: 'productName',
    //     parentFilterId: 12,
    //     parentItemId: 1,
    //     items: [{
    //         id: 1,
    //         name: '铜',
    //         value: '铜'
    //     }, {
    //             id: 2,
    //             name: '铁',
    //             value: '铁'
    //         }, {
    //             id: 3,
    //             name: '锌',
    //             value: '锌'
    //         }, {
    //             id: 4,
    //             name: '铝',
    //             value: '铝'
    //         }],
    //     multipleSelection: false
    // }
    // {
    //     id: 14,
    //     title: '货物规格',
    //     parentFilterId: 1,
    //     parentItemId: 2,
    //     key: 'productSpecification',
    //     filterProperty: FilterProperty.Requirement,
    //     items: [],
    //     type: TEXT
    // },
    // {
    //     id: 15,
    //     title: '货物单价',
    //     key: 'productPrice',
    //     parentFilterId: 1,
    //     parentItemId: 2,
    //     filterProperty: FilterProperty.Requirement,
    //     items: [],
    //     type: TEXT
    // },
    // {
    //     id: 16,
    //     title: '货物数量',
    //     key: 'productQuantity',
    //     parentFilterId: 1,
    //     parentItemId: 2,
    //     filterProperty: FilterProperty.Requirement,
    //     items: [],
    //     type: TEXT
    // },
    // {
    //     id: 17,
    //     title: '货物单位',
    //     key: 'productUnit',
    //     parentFilterId: 1,
    //     parentItemId: 2,
    //     filterProperty: FilterProperty.Requirement,
    //     items: [{
    //         id: 1,
    //         name: '千克',
    //         value: '千克'
    //     }, {
    //             id: 2,
    //             name: '吨',
    //             value: '吨'
    //         }, {
    //             id: 3,
    //             name: '千吨',
    //             value: '千吨'
    //         }]
    // }

];