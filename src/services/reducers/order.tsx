import { AnyAction } from "redux";
import {
  _REQUEST_ORDER,
  _SUCCESS_ORDER,
  _ERROR_ORDER,
  DROP_ORDER,
} from "../actions/order";

const initialState = {
  loading: false,
  name: null,
  order: {
    number: null,
  },
  success: false,
};

export const orderReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case _REQUEST_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }
    case _SUCCESS_ORDER: {
      return {
        ...state,
        loading: false,
        name: action.name ?? null,
        order: {
          number: action.order.number,
        },
        success: true,
      };
    }
    case _ERROR_ORDER: {
      return {
        ...state,
        name: null,
        order: {
          number: null,
        },
        success: false,
      };
    }

    case DROP_ORDER: {
      return {
        ...state,
        name: null,
        order: {
          number: null,
        },
        success: false,
      };
    }
    default: {
      return state;
    }
  }
};
