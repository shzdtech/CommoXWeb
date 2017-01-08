export default {
    userName: {
        label: '用户名称',
        type: 'text',
        legth: 'medium',
        key: 'userName',
        placeholder: '用户名称',
        isRequired: true
    },
    email: {
        label: '登录邮箱',
        type: 'text',
        legth: 'medium',
        key: 'email',
        placeholder: '邮箱',
        isRequired: true
    },
    password: {
        label: '登录密码',
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
