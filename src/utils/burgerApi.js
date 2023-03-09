const NORMA_API = 'https://norma.nomoreparties.space/api'


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredients() {
    const res = await fetch(`${NORMA_API}/ingredients`);
    return checkReponse(res);
}

