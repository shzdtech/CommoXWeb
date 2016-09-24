export default {
    name: {
        label: '企业名称',
        type: 'text',
        legth: 'medium',
        key: 'name',
        placeholder: '企业名称',
        isRequired: true
    },
    address: {
        label: '企业地址',
        type: 'text',
        legth: 'long',
        key: 'address',
        placeholder: '企业地址'
    },
    emailAddress: {
        label: '企业登录邮箱',
        type: 'text',
        legth: 'medium',
        key: 'emailAddress',
        placeholder: '企业邮箱',
        isRequired: true
    },
    verificationCode:{
        label: '验证码',
        type: 'text',
        legth: 'medium',
        key: 'verificationCode',
        placeholder: '查看邮箱获取验证码',
        isRequired: true
    },
    contacts: {
        label: '联系人',
        type: 'text',
        legth: 'medium',
        key: 'contacts',
        placeholder: '联系人',
        isRequired: true
    },
    mobilePhone:{
        label: '联系方式',
        type: 'text',
        legth: 'medium',
        key: 'mobilePhone',
        placeholder: '联系人手机号码',
        isRequired: true
    },
    fax:{
        label: '传真',
        type: 'text',
        legth: 'medium',
        key: 'fax',
        placeholder: '传真号码'
    },
    password:{
        label: '登录密码',
        type: 'password',
        legth: 'medium',
        key: 'password',
        placeholder: '请输入登录密码',
        sufix: '建议密码长度不少于8位，并且包含数字，大小字母写或符号',
        isRequired: true
    },
    confirmPassword:{
        label: '确认密码',
        type: 'password',
        legth: 'medium',
        key: 'confirmPassword',
        placeholder: '确认密码',
        isRequired: true
    }
    // registerNumber: {
    //     label: '企业注册代码',
    //     type: 'text',
    //     key: 'registerNumber',
    //     length: 'medium',
    //     placehodler: '企业注册代码'
    // },
    // registerTime: {
    //     label: '企业注册时间',
    //     type: 'date',
    //     key: 'registerTime',
    //     length: 'medium',
    //     placehodler: '企业注册时间'
    // },
    // registerCapital: {
    //     label: '注册资金(￥)',
    //     type: 'text',
    //     key: 'registerCapital',
    //     length: 'medium',
    //     placehodler: '企业注册资金'
    // },
    // registerAddress: {
    //     label: '注册地址',
    //     type: 'text',
    //     key: 'registerAddress',
    //     length: 'medium',
    //     placehodler: '注册地址'
    // },
    // legalRepresentative: {
    //     label: '法人代表',
    //     type: 'text',
    //     key: 'legalRepresentative',
    //     length: 'short',
    //     placehodler: '法人代表'
    // },
    // invoicedQuantity: {
    //     label: '开票量',
    //     type: 'number',
    //     key: 'invoicedQuantity',
    //     length: 'short',
    //     placehodler: '开票量'
    // },
    // businessTypeId: {
    //     label: '企业类型',
    //     type: 'select',
    //     key: 'businessTypeId',
    //     length: 'short',
    //     options: [
    //         {
    //             label: '国有企业',
    //             key: '1',
    //             value: '1'
    //         }, {
    //             label: '合资企业',
    //             key: '2',
    //             value: '2'
    //         }
    //     ]
    // },
    // businessRange: {
    //     label: '企业业务范围',
    //     type: 'text',
    //     key: 'businessRange',
    //     length: 'short',
    //     placehodler: '企业业务范围'
    // },
    // reputationGrade: {
    //     label: '信用等级',
    //     type: 'select',
    //     key: 'reputationGrade',
    //     length: 'short',
    //     options: [{
    //         key: '1',
    //         value: '1',
    //         label: '极好'
    //     }, {
    //             key: '2',
    //             value: '2',
    //             label: '良好'
    //         }, {
    //             key: '3',
    //             value: '3',
    //             label: '一般'
    //         }, {
    //             key: '4',
    //             value: '4',
    //             label: '差'
    //         }, {
    //             key: '5',
    //             value: '5',
    //             label: '非常差'
    //         }
    //     ]
    // },
    // annualInspection: {
    //     label: '年检情况',
    //     type: 'text',
    //     key: 'annualInspection',
    //     length: 'medium',
    //     placehodler: '年检情况'
    // },
    // previousSales: {
    //     label: '上年度营业额',
    //     type: 'number',
    //     key: 'previousSales',
    //     length: 'short',
    //     placehodler: '上年度营业额'
    // },
    // previousProfit: {
    //     label: '上年度营利润',
    //     type: 'number',
    //     key: 'previousProfit',
    //     length: 'short',
    //     placehodler: '上年度营利润'
    // },
    // paymentMethodId: {
    //     label: '支付方式',
    //     type: 'select',
    //     key: 'paymentMethodId',
    //     length: 'short',
    //     options: [{
    //         key: '100',
    //         label: '现金',
    //         value: '100'
    //     }, {
    //             key: '101',
    //             label: '承兑汇票',
    //             value: '101'
    //         }, {
    //             key: '102',
    //             label: '转帐',
    //             value: '102'
    //         }]
    // },
    // registerBankId: {
    //     label: '注册银行',
    //     type: 'select',
    //     key: 'registerBankId',
    //     length: 'short',
    //     options: [{
    //         key: '100',
    //         value: '100',
    //         label: '中国工商银行'
    //     }, {
    //             key: '101',
    //             value: '101',
    //             label: '中国建设银行'
    //         }, {
    //             key: '102',
    //             value: '102',
    //             label: '中国农业银行'
    //         }]
    // },
    // registerAccount: {
    //     label: '企业开户账号',
    //     type: 'text',
    //     key: 'registerAccount',
    //     length: 'short',
    //     placehodler: '企业开户账号'
    // }
};
