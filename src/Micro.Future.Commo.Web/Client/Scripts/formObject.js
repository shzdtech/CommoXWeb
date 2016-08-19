import {TEXT, DATE} from './Constants/FilterTypes';
import RequirementType from './Models/RequirementType';
import FilterProperty from './Models/FilterProperty';
import RuleType from './Models/RuleType';
import Category from './Models/Category';

export default {
    selectedType: RequirementType.Buy,
    main: {
        id: 1,
        title: '订单属性',
        key: 'type',
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
    buy: [
        {
            id: 1,
            title: '资金金额',
            key: 'productSpecification',
            filterProperty: FilterProperty.Requirement,
            category: Category.Capital,
            type: TEXT
        }, {
            id: 2,
            title: '货款支付时间',
            key: 'productSpecification',
            filterProperty: FilterProperty.Requirement,
            category: Category.Capital,
            type: TEXT
        }, {
            id: 3,
            title: '支付方式',
            filterProperty: FilterProperty.Requirement,
            key: 'paymentType',
            category: Category.Capital,
            items: [{
                id: 1,
                name: '现金',
                value: '现金'
            }, {
                    id: 2,
                    name: '承兑汇票',
                    value: '承兑汇票'
                }]
        }, {
            id: 4,
            title: '企业仓库开户',
            key: 'warehouseAccount',
            filterProperty: FilterProperty.Requirement,
            category: Category.Product,
            type: TEXT
        }, {
            id: 5,
            title: '货物类型',
            filterProperty: FilterProperty.Requirement,
            key: 'productType',
            category: Category.Product,
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
            id: 5,
            title: '货物名称',
            filterProperty: FilterProperty.Requirement,
            key: 'productName',
            category: Category.Product,
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
            id: 6,
            title: '货物规格',
            key: 'productSpecification',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            items: [],
            type: TEXT
        }, {
            id: 9,
            title: '货物数量',
            key: 'productQuantity',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 10,
            title: '仓库地址',
            key: 'warehouseAddress1',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 11,
            title: '开票面额',
            key: 'invoiceValue',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [{
                id: 1,
                name: '10万',
                value: '10万'
            }, {
                    id: 2,
                    name: '100万',
                    value: '100万'
                }, {
                    id: 3,
                    name: '1000万',
                    value: '1000万'
                }]
        }, {
            id: 12,
            title: '开票时间',
            key: 'invoiceIssueDateTime',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 13,
            title: '发票交接方式',
            key: 'invoiceTransferMode',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 14,
            title: '企业类型',
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            category: Category.Enterprise,
            items: [{
                id: 1,
                name: '国有企业',
                value: '国有企业'
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
            id: 15,
            title: '注册资本',
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            category: Category.Enterprise,
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
        }, {
            id: 16,
            title: '注册地',
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            category: Category.Enterprise,
            multipleSelection: false,
            type: TEXT
        }
    ],
    sell: [{
        id: 5,
        title: '货物类型',
        filterProperty: FilterProperty.Requirement,
        key: 'productType',
        category: Category.Product,
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
            id: 1,
            title: '货物名称',
            filterProperty: FilterProperty.Requirement,
            key: 'productName',
            category: Category.Product,
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
            id: 2,
            title: '货物规格',
            key: 'productSpecification',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 3,
            title: '货物数量',
            key: 'productQuantity',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 4,
            title: '仓库地址',
            key: 'warehouseAddress1',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 5,
            title: '开票面额',
            key: 'invoiceValue',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [{
                id: 1,
                name: '10万',
                value: '10万'
            }, {
                    id: 2,
                    name: '100万',
                    value: '100万'
                }, {
                    id: 3,
                    name: '1000万',
                    value: '1000万'
                }]
        }, {
            id: 6,
            title: '开票时间',
            key: 'invoiceIssueDateTime',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 7,
            title: '发票交接方式',
            key: 'invoiceTransferMode',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 8,
            title: '企业类型',
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            category: Category.Enterprise,
            items: [{
                id: 1,
                name: '国有企业',
                value: '国有企业'
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
            id: 9,
            title: '注册资本',
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            category: Category.Enterprise,
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
        }, {
            id: 10,
            title: '注册地',
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            category: Category.Enterprise,
            multipleSelection: false,
            type: TEXT
        }
    ],
    subsidy: [
        {
            id: 1,
            title: '合同总额',
            key: 'tradeAmount',
            category: Category.Contract,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        },
        {
            id: 2,
            title: '合同利润',
            key: 'tradeProfit',
            category: Category.Contract,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 3,
            title: '合同上下游企业类型',
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            category: Category.Contract,
            items: [{
                id: 1,
                name: '国有企业',
                value: '国有企业'
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
        }, {
            id: 4,
            title: '经营范围',
            key: 'businessRange',
            category: Category.Contract,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        },  {
            id: 5,
            title: '开票面额',
            key: 'invoiceValue',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [{
                id: 1,
                name: '10万',
                value: '10万'
            }, {
                    id: 2,
                    name: '100万',
                    value: '100万'
                }, {
                    id: 3,
                    name: '1000万',
                    value: '1000万'
                }]
        },{
            id: 6,
            title: '开票时间',
            key: 'invoiceIssueDateTime',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 7,
            title: '发票交接方式',
            key: 'invoiceTransferMode',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }
    ]
};