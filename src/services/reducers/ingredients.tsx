import {
  _REQUEST_GET_INGRIDIENTS,
  _SUCCESS_GET_INGRIDIENTS,
  _ERROR_GET_INGRIDIENTS,
} from "../actions/ingridients";
import { AnyAction } from "redux";
import { IngredientsType } from "../../utils/Types";

const initialState: IngredientsType = {
  loading: false,
  success: false,
  error: false,
  ingridients: { success: false, data: [] },
};

export const ingredientsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case _REQUEST_GET_INGRIDIENTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case _SUCCESS_GET_INGRIDIENTS: {
      return {
        ...state,
        loading: false,
        success: true,
        ingridients: action?.ingredients,
      };
    }
    case _ERROR_GET_INGRIDIENTS: {
      return {
        ...state,
        ingridients: [],
        loading: false,
        success: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};
