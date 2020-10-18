const TOKEN_KEY = 'token'

const isLogedIn = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}

export default isLogedIn ; 
