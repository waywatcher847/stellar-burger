import { normaAPI } from "../../utils/Constants";
import { AnyAction, Dispatch } from 'redux'; 
import { IdList } from "../../utils/Types";
import { AppDispatch } from '../../hooks/useAppDispatch'; 

export const _REQUEST_ORDER = '_REQUEST_ORDER';
export const _SUCCESS_ORDER = '_SUCCESS_ORDER';
export const _ERROR_ORDER = '_ERROR_ORDER';

export const getOrderDetails = (ingredients: IdList) => { 
    return async (dispatch: AppDispatch) => {
        dispatch({ type: _REQUEST_ORDER });

        try {
            const response = await fetch('https://norma.nomoreparties.space/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients: ingredients})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }

            const data = await response.json();
            dispatch({ type: _SUCCESS_ORDER, payload: data });
        } catch (error:any) {
            dispatch({ type: _ERROR_ORDER, payload: error.message });
        }
    };
}