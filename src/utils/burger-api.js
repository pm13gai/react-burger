import { setCookie, getCookie } from './utils';

const NORMA_API = 'https://norma.nomoreparties.space/api'


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


export async function request(endpoint, options) {
    const res = await fetch(`${NORMA_API}/${endpoint}`, options);
    return checkReponse(res);
}

export const refreshToken = () => {
    return request(`auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ token: getCookie('refreshToken') })
    })
};

export const requestWithRefresh = async (endpoint, options) => {
    try {
        const res = await fetch(`${NORMA_API}/${endpoint}`, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            let authToken = refreshData.accessToken.split('Bearer ')[1];
            if (authToken) {
                setCookie('token', authToken);
            }
            setCookie('refreshToken', refreshData.refreshToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${NORMA_API}/${endpoint}`, options);
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};