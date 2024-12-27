let { token } = Cookies.get();

export const getToken = () => token

const getUserData = () => {
    const decodedToken = token ? jwt_decode(token) : undefined;
    return decodedToken;
}

export const removeCookies = () => {
    Cookies.remove(key)
};

export default getUserData;