const userStore = {
    saveToke: (data: any) => {
        localStorage.setItem("auth_data", JSON.stringify(data));
    },
    isLoggedIn: () => {
        var item = localStorage.getItem('auth_data');
        return !!item;
    },
    getToken: () => {
        var item = localStorage.getItem('auth_data');
        if(item) return JSON.parse(item).token;
    },
    logout: () => {
        window.localStorage.removeItem('auth_data');
    }
}

export default userStore;

