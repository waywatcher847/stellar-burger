

import uniqid from "uniqid";
import {Ingredient} from "../../utils/Types";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_TOTALPRICE = "SET_TOTALPRICE";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const addIngredient = (itemCard:Ingredient) => ({
    type: ADD_INGREDIENT,
    payload: {
        item: itemCard,
        uniqid: uniqid()
    }
  });
