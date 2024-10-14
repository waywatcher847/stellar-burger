import { BASE_URL } from "./Constants";
import { IdList } from "./Types";
import { checkReponse } from "./checkresponse";

export function getIngredientsRequest() {
  return fetch(`${BASE_URL}/ingredients`).then(checkReponse);
}

export function postOrder(ingredients: IdList) {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then(checkReponse);
}
