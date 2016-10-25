export default {
    bankAddress: {
        label: '银行所在地',
        type: 'text',
        length: 'medium',
        key: 'bankAddress',
        placeholder: '请输入银行所在地',
        isRequired: true
    },
    productTerm: {
        label: '产品期限(天)',
        type: 'number',
        length: 'medium',
        key: 'productTerm',
        placeholder: '请输入产品期限',
        isRequired: true
    },
    productYield: {
        label: '年华收益率(%)',
        type: 'number',
        length: 'medium',
        key: 'productYield',
        placeholder: '请输入年华收益率',
        isRequired: true
    }
};
