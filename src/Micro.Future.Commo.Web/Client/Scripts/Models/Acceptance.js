export default {
    amount: {
        label: '承兑汇票金额',
        type: 'number',
        length: 'medium',
        key: 'amount',
        placeholder: '请输入承兑汇票金额',
         sufix: '万',
        isRequired: true
    },
    dueDate: {
        label: '到期时间',
        type: 'date',
        length: 'medium',
        key: 'dueDate',
        placeholder: '请输入到期时间',
        isRequired: true
    },
    bankName: {
        label: '开票银行',
        type: 'text',
        length: 'medium',
        key: 'bankName',
        placeholder: '请输入开票银行',
        isRequired: true
    },
    acceptanceType: {
        label: '开票行类别',
        type: 'select',
        length: 'medium',
        key: 'acceptanceType',
        placeholder: '请选择开票行类别',
        isRequired: true,
        options: [{
            key: '国股',
            value: 1,
            label: '国股'
        }, {
                key: '城商',
                value: 2,
                label: '城商'
            },{
                key: '农商',
                value: 3,
                label: '农商'
            }
        ]
    },
    subsidies:{
        label: '贴息(%)',
        type: 'text',
        length: 'medium',
        key: 'subsidies',
        placeholder: '请输入贴息',
        isRequired: true
    },
    drawTime: {
        label: '出票时间',
        type: 'date',
        length: 'medium',
        key: 'drawTime',
        placeholder: '请输入出票时间',
        isRequired: true
    }
};
