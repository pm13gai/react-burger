const NORMA_API = 'https://norma.nomoreparties.space/api'


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


export async function request(endpoint, options) {
    const res = await fetch(`${NORMA_API}/${endpoint}`, options);
    return checkReponse(res);
}