export default {
    bankName: {
        label: '贴票行',
        type: 'text',
        length: 'medium',
        key: 'bankName',
        placeholder: '请输入贴票行',
        isRequired: true
    },
    bankType: {
        label: '开票行类别',
        type: 'select',
        length: 'medium',
        key: 'bankType',
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
    acceptanceType: {
        label: '票据类别',
        type: 'select',
        length: 'medium',
        key: 'acceptanceType',
        placeholder: '请选择票据类别',
        isRequired: true,
        options: [{
            key: '大票',
            value: 1,
            label: '大票'
        }, {
                key: '小票',
                value: 2,
                label: '小票'
            }
        ]
    },
    bankPrice:{
        label: '银行报价(%)',
        type: 'text',
        length: 'medium',
        key: 'bankPrice',
        placeholder: '请输入银行报价(贴现利率)',
        isRequired: true
    }
};
