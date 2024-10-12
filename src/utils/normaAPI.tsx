import { normaAPI } from "./Constants";
import { ExpectedStructure } from "./Types";
import { IdList } from "./Types";

export function getIngredientsRequest() {
    return fetch(`${normaAPI}/ingredients`)
        .then((res) => {
            return res.ok ? 
            res.json() : 
            res.json().then((err) => Promise.reject(err));
        })
}

export function postOrder(ingredients:IdList) {
    return fetch(`${normaAPI}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingredients,
        }),
    }).then((res) => {
        return res.ok ? 
        res.json() : 
        res.json().then((err) => Promise.reject(err));
    })
}