export default {
    amount: {
        label: '承兑汇票金额',
        type: 'number',
        legth: 'medium',
        key: 'amount',
        placeholder: '请输入承兑汇票金额',
         sufix: '万',
        isRequired: true
    },
    dueDate: {
        label: '到期时间',
        type: 'date',
        legth: 'medium',
        key: 'dueDate',
        placeholder: '请输入到期时间',
        isRequired: true
    },
    bankName: {
        label: '开票银行',
        type: 'text',
        legth: 'medium',
        key: 'bankName',
        placeholder: '请输入开票银行',
        isRequired: true
    },
    acceptanceType: {
        label: '票据类型',
        type: 'select',
        legth: 'medium',
        key: 'acceptanceType',
        placeholder: '请选择票据类型',
        isRequired: true,
        options: [{
            key: '电票',
            value: 1,
            label: '电票'
        }, {
                key: '纸票',
                value: 2,
                label: '纸票'
            }
        ]
    },
    drawTime: {
        label: '出票时间',
        type: 'date',
        legth: 'medium',
        key: 'drawTime',
        placeholder: '请输入出票时间',
        isRequired: true
    }
};
