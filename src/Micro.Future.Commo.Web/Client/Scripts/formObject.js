import {TEXT, DATE} from './Constants/FilterTypes';
import RequirementType from './Models/RequirementType';
import FilterProperty from './Models/FilterProperty';
import RuleType from './Models/RuleType';
import Category from './Models/Category';
import enterpriseTypes from './Models/EnterpriseTypes';

let products = [{
    id: 1,
    name: '铜',
    value: '铜'
}, {
        id: 2,
        name: '铝',
        value: '铝'
    }, {
        id: 3,
        name: '铅',
        value: '铅'
    }, {
        id: 4,
        name: '锌',
        value: '锌'
    }, {
        id: 5,
        name: '锌',
        value: '锌'
    }, {
        id: 6,
        name: '锡',
        value: '锡'
    }, {
        id: 7,
        name: '镍',
        value: '镍'
    }, {
        id: 8,
        name: '锰',
        value: '锰'
    }, {
        id: 9,
        name: '硅',
        value: '硅'
    }, {
        id: 10,
        name: '钴锂',
        value: '钴锂'
    }, {
        id: 11,
        name: '锑',
        value: '锑'
    }, {
        id: 12,
        name: '铟镓锗',
        value: '铟镓锗'
    }, {
        id: 13,
        name: '钨',
        value: '钨'
    }, {
        id: 14,
        name: '铋硒碲',
        value: '铋硒碲'
    }, {
        id: 15,
        name: '钴锂',
        value: '钴锂'
    }, {
        id: 16,
        name: '小金属',
        value: '小金属'
    }, {
        id: 17,
        name: '贵金属',
        value: '贵金属'
    }, {
        id: 18,
        name: '稀土',
        value: '稀土'
    }, {
        id: 19,
        name: '钢铁',
        value: '钢铁'
    }, {
        id: 20,
        name: '废金属',
        value: '废金属'
    }, {
        id: 21,
        name: '利源',
        value: '利源'
    }];

let invoiceValues = [{
    id: 1,
    name: '千元版',
    value: 1
}, {
        id: 2,
        name: '万元版',
        value: 2
    }, {
        id: 3,
        name: '十万元版',
        value: 3
    }, {
        id: 4,
        name: '百万元版',
        value: 4
    }, {
        id: 5,
        name: '千万元版',
        value: 5
    }];

let paymentTypes = [{
    id: 1,
    name: '电汇（现金）',
    value: 1
}, {
        id: 2,
        name: '银行电子汇票',
        value: 2
    }, {
        id: 3,
        name: '信用证',
        value: 3
    }, {
        id: 4,
        name: '商业承兑汇票',
        value: 4
    }];

export default {
    createFor: 0,
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
        isRequired: true,
        multipleSelection: false
    },
    buy: [
        {
            id: 1,
            title: '货款支付时间',
            key: 'paymentDateTime',
            filterProperty: FilterProperty.Requirement,
            category: Category.Capital,
            type: DATE
        }, {
            id: 2,
            title: '支付方式',
            filterProperty: FilterProperty.Requirement,
            key: 'paymentType',
            category: Category.Capital,
            items: [...paymentTypes]
        }, {
            id: 3,
            title: '开户银行名称',
            key: 'paymentBankName',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 4,
            title: '银行帐号',
            key: 'paymentBankAccount',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 5,
            title: '银行行号',
            key: 'paymentBankId',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 6,
            title: '开户银行地址',
            key: 'paymentBankAddress',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 7,
            title: '已开通电子票口',
            filterProperty: FilterProperty.Requirement,
            key: 'isAcceptanceBillETicket',
            category: Category.Capital,
            items: [{
                id: 1,
                name: '是',
                value: true
            }, {
                    id: 2,
                    name: '否',
                    value: false
                }]
        }, {
        id: 8,
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
            id: 9,
            title: '货物名称',
            filterProperty: FilterProperty.Requirement,
            key: 'productName',
            category: Category.Product,
            isRequired: true,
            items: products,
            multipleSelection: true
        }, {
            id: 10,
            title: '货物数量',
            key: 'productQuantity',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT,
            isRequired: true,
            valueType: 'number',
            unit: '吨'
        }, {
            id: 11,
            title: '货物单价',
            key: 'productPrice',
            filterProperty: FilterProperty.Requirement,
            category: Category.Product,
            type: TEXT,
            isRequired: true,
            valueType: 'number'
        }, {
            id: 12,
            title: '企业仓库开户',
            key: 'warehouseAccount',
            filterProperty: FilterProperty.Requirement,
            category: Category.Product,
            type: TEXT
        }, {
            id: 13,
            title: '下游企业类型',
            key: 'EnterpriseType',
            filterProperty: FilterProperty.Rule,
            ruleDirectionType: 2, 
            ruleType: RuleType.Enterprise,
            category: Category.Enterprise,

            items: [...enterpriseTypes],
            multipleSelection: true
        }, {
            id: 14,
            title: '开票面额',
            key: 'invoiceValue',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [...invoiceValues]
        }, {
            id: 15,
            title: '开票量',
            key: 'invoicedQuantity',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 16,
            title: '开票要求',
            key: 'invoiceRequirement',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [{
                id: 1,
                name: '款货后票',
                value: '款货后票'
            }, {
                    id: 2,
                    name: '款货（实提数）后票',
                    value: '款货（实提数）后票'
                }, {
                    id: 3,
                    name: '不限',
                    value: '不限'
                }]
        }, {
            id: 17,
            title: '开票时间',
            key: 'invoiceIssueDateTime',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: DATE
        }, {
            id: 18,
            title: '发票交接方式',
            key: 'invoiceTransferMode',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 19,
            title: '经营范围',
            key: 'businessRange',
            category: Category.Enterprise,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }
    ],
    sell: [{
        id: 1,
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
            id: 2,
            title: '货物名称',
            filterProperty: FilterProperty.Requirement,
            key: 'productName',
            isRequired: true,
            category: Category.Product,
            items: products,
            multipleSelection: true
        },
        {
            id: 3,
            title: '货物规格',
            key: 'productSpecification',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 4,
            title: '货物单价',
            key: 'productPrice',
            isRequired: true,
            valueType: 'number',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 5,
            title: '货物数量',
            key: 'productQuantity',
            isRequired: true,
            valueType: 'number',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT,
            unit: '吨'
        }, {
            id: 6,
            title: '电子仓单',
            key: 'eWarehouseReceipt',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 7,
            title: '货物所在仓库地址',
            key: 'warehouseAddress1',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        },  
        //{
        //     id: 8,
        //     title: '交易要求',
        //     key: 'productTransferMode',
        //     filterProperty: FilterProperty.Requirement,
        //     category: Category.Capital,
        //     items: [{
        //         id: 1,
        //         name: '先货后款',
        //         value: '先货后款'
        //     }, {
        //             id: 2,
        //             name: '款到出货',
        //             value: '款到出货'
        //         }, {
        //             id: 3,
        //             name: '不限',
        //             value: '不限'
        //         }]
        // }, 
        {
            id: 9,
            title: '支付方式',
            filterProperty: FilterProperty.Requirement,
            key: 'paymentType',
            category: Category.Capital,
            items: [...paymentTypes]
        }, {
            id: 10,
            title: '开户银行名称',
            key: 'paymentBankName',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 11,
            title: '银行帐号',
            key: 'paymentBankAccount',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 12,
            title: '银行行号',
            key: 'paymentBankId',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 13,
            title: '开户银行地址',
            key: 'paymentBankAddress',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 14,
            title: '已开通电子票口',
            filterProperty: FilterProperty.Requirement,
            key: 'isAcceptanceBillETicket',
            category: Category.Capital,
            items: [{
                id: 1,
                name: '是',
                value: true
            }, {
                    id: 2,
                    name: '否',
                    value: false
                }]
        },{
            id: 15,
            title: '开票面额',
            key: 'invoiceValue',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [...invoiceValues]
        }, {
            id: 16,
            title: '开票量',
            key: 'invoicedQuantity',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 17,
            title: '开票要求',
            key: 'invoiceRequirement',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [{
                id: 1,
                name: '款货后票',
                value: '款货后票'
            }, {
                    id: 2,
                    name: '款货（实提数）后票',
                    value: '款货（实提数）后票'
                }, {
                    id: 3,
                    name: '不限',
                    value: '不限'
                }]
        }, {
            id: 18,
            title: '开票时间',
            key: 'invoiceIssueDateTime',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: DATE
        }, {
            id: 19,
            title: '发票交接方式',
            key: 'invoiceTransferMode',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 20,
            title: '合同上游企业类型',
            key: 'EnterpriseType',
            filterProperty: FilterProperty.Rule,
            ruleDirectionType: 1, 
            ruleType: RuleType.Enterprise,
            category: Category.Enterprise,
            items: [...enterpriseTypes],
            multipleSelection: true
        }, {
            id: 21,
            title: '经营范围',
            key: 'businessRange',
            category: Category.Enterprise,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }
    ],
    subsidy: [
        {
            id: 1,
            title: '合同金额',
            key: 'tradeAmount',
            category: Category.Contract,
            isRequired: true,
            valueType: 'number',
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 2,
            title: '合同上游企业类型',
            key: 'EnterpriseType',
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            ruleDirectionType: 1, 
            category: Category.Contract,
            items: [...enterpriseTypes],
            multipleSelection: true
        }, {
            id: 3,
            title: '合同下游企业类型',
            key: 'EnterpriseType',
            ruleDirectionType: 2, 
            filterProperty: FilterProperty.Rule,
            ruleType: RuleType.Enterprise,
            category: Category.Contract,
            items: [...enterpriseTypes],
            multipleSelection: true
        }, {
            id: 4,
            title: '支付方式',
            filterProperty: FilterProperty.Requirement,
            key: 'paymentType',
            category: Category.Capital,
            items: [...paymentTypes]
        }, {
            id: 5,
            title: '支付风控',
            filterProperty: FilterProperty.Requirement,
            key: 'paymentRiskControl',
            category: Category.Capital,
            items: [{
                id: 1,
                name: '需自主收付',
                value: 1
            }, {
                    id: 2,
                    name: '需自主收付',
                    value: 0
                }]
        }, {
            id: 6,
            title: '开户银行名称',
            key: 'paymentBankName',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 7,
            title: '银行帐号',
            key: 'paymentBankAccount',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 8,
            title: '银行行号',
            key: 'paymentBankId',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 9,
            title: '开户银行地址',
            key: 'paymentBankAddress',
            category: Category.Capital,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 10,
            title: '已开通电子票口',
            filterProperty: FilterProperty.Requirement,
            key: 'isAcceptanceBillETicket',
            category: Category.Capital,
            items: [{
                id: 1,
                name: '是',
                value: true
            }, {
                    id: 2,
                    name: '否',
                    value: false
                }]
        }, {
            id: 12,
            title: '货物名称',
            filterProperty: FilterProperty.Requirement,
            key: 'productName',
            category: Category.Product,
            items: products,
            multipleSelection: true
        }, {
            id: 13,
            title: '货物交接方式',
            filterProperty: FilterProperty.Requirement,
            key: 'productTransferMode',
            category: Category.Product,
            items: [{
                id: 1,
                name: '入库过户',
                value: 1
            }, {
                    id: 2,
                    name: '委托过户',
                    value: 2
                }, {
                    id: 3,
                    name: '提单背书',
                    value: 3
                }],
            multipleSelection: true
        }, {
            id: 11,
            title: '企业开户仓库',
            key: '',
            category: Category.Product,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 14,
            title: '开票面额',
            key: 'invoiceValue',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [...invoiceValues]
        }, {
            id: 15,
            title: '开票量',
            key: 'invoicedQuantity',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 16,
            title: '开票要求',
            key: 'invoiceRequirement',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            items: [{
                id: 1,
                name: '款货后票',
                value: 1
            }, {
                    id: 2,
                    name: '款货（实提数）后票',
                    value: 2
                }, {
                    id: 3,
                    name: '不限',
                    value: 0
                }]
        }, {
            id: 17,
            title: '开票时间',
            key: 'invoiceIssueDateTime',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: DATE
        }, {
            id: 18,
            title: '发票交接方式',
            key: 'invoiceTransferMode',
            category: Category.Invoice,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        }, {
            id: 19,
            title: '经营范围',
            key: 'businessRange',
            category: Category.Enterprise,
            filterProperty: FilterProperty.Requirement,
            type: TEXT
        },
    ]
};