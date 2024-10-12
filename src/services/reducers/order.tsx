
import { AnyAction } from 'redux'; 
import { _REQUEST_ORDER, _SUCCESS_ORDER, _ERROR_ORDER } from '../actions/order';
import {OrderResponseStructure } from '../../utils/Types';

const initialState = {
    loading: false,
    name: null,
    order: {
        number: null,
    },
    success: false,
}

export const orderReducer = (state = initialState, action:AnyAction ) => {

    switch (action.type) {
        case _REQUEST_ORDER: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case _SUCCESS_ORDER: {
            return {
                ...state,
                isLoading: false,
                name: action.res?.name ?? null,
                order: {
                    number: action.res?.order.number,
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
        default: {
            return state;
        }
    }
};
