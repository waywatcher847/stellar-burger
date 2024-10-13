import { AnyAction, Dispatch } from "redux";
import { IdList } from "../../utils/Types";
import { postOrder } from "../../utils/normaAPI";

export const _REQUEST_ORDER = "_REQUEST_ORDER";
export const _SUCCESS_ORDER = "_SUCCESS_ORDER";
export const _ERROR_ORDER = "_ERROR_ORDER";

export const getOrderDetails = (ingredients: IdList) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: _REQUEST_ORDER,
    });
    postOrder(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: _SUCCESS_ORDER,
            name: res.name,
            order: {
              number: res.order.number,
            },
          });
        } else {
          dispatch({
            type: _ERROR_ORDER,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: _ERROR_ORDER,
        });
      });
  };
};
