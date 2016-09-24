module.exports = {
    getUserInfo() {
        return $.parseJSON(sessionStorage.getItem('userInfo'));
    },

    loggedIn() {
        return sessionStorage.userInfo !== undefined && sessionStorage.userInfo !== null;
    },

    setUserInfo(userInfo) {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    },

    removeUserInfo(){
        sessionStorage.removeItem('userInfo');
    }
}
