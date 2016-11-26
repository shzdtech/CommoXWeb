module.exports = {
    getUserInfo() {
        return $.parseJSON(sessionStorage.getItem('userInfo'));
    },

    loggedIn() {
        return sessionStorage.userInfo !== undefined && sessionStorage.userInfo !== null;
    },

    setUserInfo(userInfo) {
        if(userInfo != null){
            userInfo.isAdmin = false;
            userInfo.isAdministrator = false;
            
            if(userInfo.roles.find((r) => { return r === 'Admin' })){
                userInfo.isAdmin = true;
            }else if(userInfo.roles.find((r) => { return r === 'Administrator' })){
                userInfo.isAdministrator = true;
            }
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    },

    removeUserInfo(){
        sessionStorage.removeItem('userInfo');
    }
}
