import { getIngredientsRequest } from '../../utils/normaAPI';
import { Dispatch } from 'redux'; 

export const _REQUEST_GET_INGRIDIENTS = '_REQUEST';
export const _SUCCESS_GET_INGRIDIENTS = '_SUCCESS';
export const _ERROR_GET_INGRIDIENTS = '_ERROR';

export const getIngredients = () => async (dispatch:Dispatch) => {
 
        dispatch({
            type: _REQUEST_GET_INGRIDIENTS,
        })
        getIngredientsRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: _SUCCESS_GET_INGRIDIENTS,
                    ingredients: res,
                })
            } else {
                dispatch({
                    type: _ERROR_GET_INGRIDIENTS,
                })
            }
        }).catch(() => {
            dispatch({
                type: _ERROR_GET_INGRIDIENTS,
                error: true,
            })
        })
    }
