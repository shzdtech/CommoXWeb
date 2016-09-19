export default {
    email: {
        label: '注册邮箱',
        type: 'text',
        legth: 'medium',
        key: 'email',
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
    password: {
        label: '重设密码',
        type: 'password',
        legth: 'medium',
        key: 'password',
        placeholder: '请输入登录密码',
        sufix: '密码长度不少于8位，并且包含数字，大小字母写或符号',
        isRequired: true
    },
    confirmPassword: {
        label: '确认密码',
        type: 'password',
        legth: 'medium',
        key: 'confirmPassword',
        placeholder: '确认密码',
        isRequired: true
    }
};
