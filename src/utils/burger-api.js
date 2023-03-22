const NORMA_API = 'https://norma.nomoreparties.space/api'


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredientsFetch() {
    const res = await fetch(`${NORMA_API}/ingredients`);
    return checkReponse(res);
}


export async function postIngredientsFetch(order) {
    const res = await fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(order)
    });
    return checkReponse(res);
}
