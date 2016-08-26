module.exports = {
    getUserInfo() {
        return $.parseJSON(localStorage.getItem('userInfo'));
    },

    loggedIn() {
        return localStorage.userInfo !== undefined && localStorage.userInfo !== null;
    },

    setUserInfo(userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
}
