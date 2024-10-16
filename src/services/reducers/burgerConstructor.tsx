import {
  ADD_INGREDIENT,
  ADD_BUN,
  REMOVE_INGREDIENT,
  SET_TOTALPRICE,
  DROP_TOTALPRICE,
  MOVE_INGREDIENT,
} from "../actions/burgerConstructor";
import { СonstructorState } from "../../utils/Types";

import { AnyAction } from "redux";

const initialState: СonstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action?.itemCard,
      };
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => item.uniqid !== action.ingredient.uniqid,
        ),
      };
    }
    case SET_TOTALPRICE: {
      const bunPrice = !state.bun ? 0 : state.bun.price * 2;
      return {
        ...state,
        totalPrice:
          [...state.ingredients].reduce(
            (sum, ingr) => sum + ingr?.item.price,
            0,
          ) + bunPrice,
      };
    }
    case DROP_TOTALPRICE: {
      return {
        ...state,
        totalPrice: 0,
      };
    }
    case MOVE_INGREDIENT: {
      const prevState = [...state.ingredients];
      const item = prevState[action?.move?.from];

      prevState.splice(action?.move?.from, 1);
      prevState.splice(action?.move?.to, 0, item);

      return {
        ...state,
        ingredients: prevState,
      };
    }
    default:
      return state;
  }
};
