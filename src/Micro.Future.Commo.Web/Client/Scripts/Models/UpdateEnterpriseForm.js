export default {
    registerNumber: {
        label: '企业注册代码',
        type: 'text',
        key: 'registerNumber',
        length: 'medium',
        placeholder: '企业注册代码',
        isRequired: true
    },
    businessLicense: {
        label: '企业执照',
        type: 'file',
        key: 'businessLicense',
        length: 'medium',
        placeholder: '上传企业执照照片',
        isRequired: true
    },
    registerTime: {
        label: '企业注册时间',
        type: 'date',
        key: 'registerTime',
        length: 'medium',
        placeholder: '企业注册时间',
        isRequired: true
    },
    invoiceMaterial: {
        label: '企业开票资料',
        type: 'text',
        key: 'invoiceMaterial',
        length: 'medium',
        placeholder: '企业开票资料',
    },
    registerCapital: {
        label: '注册资金(￥)',
        type: 'text',
        key: 'registerCapital',
        length: 'medium',
        placeholder: '企业注册资金'
    },
    registerAddress: {
        label: '注册地址',
        type: 'text',
        key: 'registerAddress',
        length: 'medium',
        placeholder: '注册地址'
    },
    legalRepresentative: {
        label: '法人代表',
        type: 'text',
        key: 'legalRepresentative',
        length: 'short',
        placeholder: '法人代表',
        isRequired: true
    },
    invoicedQuantity: {
        label: '开票量',
        type: 'number',
        key: 'invoicedQuantity',
        length: 'short',
        placeholder: '开票量',
        isRequired: true
    },
    maxTradeAmountPerMonth: {
        label: '每月最大交易量',
        type: 'number',
        key: 'maxTradeAmountPerMonth',
        length: 'short',
        placeholder: '每月最大交易量'
    },
    businessTypeId: {
        label: '企业类型',
        type: 'select',
        key: 'businessTypeId',
        length: 'short',
        isRequired: true,
        options: [
            {
                key: '1',
                label: '国有企业',
                value: 1
            }, {
                key: '2',
                label: '私有企业',
                value: 2
            }, {
                key: '3',
                label: '外商独资',
                value: 3
            }, {
                key: '4',
                label: '中外合资',
                value: 4
            }, {
                key: '5',
                label: '港澳独资',
                value: 5
            }
        ]
    },
    businessRange: {
        label: '企业业务范围',
        type: 'text',
        key: 'businessRange',
        length: 'short',
        placehodler: '企业业务范围'
    },
    reputationGrade: {
        label: '信用等级',
        type: 'select',
        key: 'reputationGrade',
        length: 'short',
        isRequired: true,
        options: [{
            key: '1',
            value: 1,
            label: '极好'
        }, {
                key: '2',
                value: 2,
                label: '良好'
            }, {
                key: '3',
                value: '3',
                label: '一般'
            }, {
                key: '4',
                value: 4,
                label: '差'
            }, {
                key: '5',
                value: 5,
                label: '非常差'
            }
        ]
    },
    annualInspection: {
        label: '年检情况',
        type: 'text',
        key: 'annualInspection',
        length: 'medium',
        placeholder: '年检情况'
    },
    previousSales: {
        label: '上年度营业额',
        type: 'number',
        key: 'previousSales',
        length: 'short',
        placeholder: '上年度营业额'
    },
    previousProfit: {
        label: '上年度营利润',
        type: 'number',
        key: 'previousProfit',
        length: 'short',
        placeholder: '上年度营利润'
    },
    paymentMethodId: {
        label: '支付方式',
        type: 'select',
        key: 'paymentMethodId',
        length: 'short',
        isRequired: true,
        options: [{
            key: '100',
            label: '现金',
            value: 100
        }, {
                key: '101',
                label: '承兑汇票',
                value: 101
            }, {
                key: '102',
                label: '转帐',
                value: 102
            }]
    },
    registerBankId: {
        label: '注册银行',
        type: 'select',
        key: 'registerBankId',
        length: 'short',
        isRequired: true,
        options: [{
            key: '100',
            value: 100,
            label: '中国工商银行'
        }, {
                key: '101',
                value: 101,
                label: '中国建设银行'
            }, {
                key: '102',
                value: 102,
                label: '中国农业银行'
            }]
    },
    isAcceptanceBillETicket: {
        label: '是否开通电子票口',
        type: 'select',
        key: 'isAcceptanceBillETicket',
        length: 'short',
        isRequired: true,
        options: [{
            key: '1',
            value: true,
            label: '是'
        }, {
                key: '2',
                value: false,
                label: '否'
            }]
    },
    registerAccount: {
        label: '企业开户账号',
        type: 'text',
        key: 'registerAccount',
        length: 'short',
        placeholder: '企业开户账号',
        isRequired: true
    },
    registerWarehouse: {
        label: '企业开户仓库 ',
        type: 'text',
        key: 'registerWarehouse',
        length: 'short',
        placeholder: '企业开户仓库'
    }
};
