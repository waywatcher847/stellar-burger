import {
    SET_INGREDIENT_INFO ,
    REMOVE_INGREDIENT_INFO ,
} from '../actions/currentIngridient';
import { AnyAction } from 'redux'; 

const initialState = {
    currentIngridient: null
}

export const currentIngredientReducer = (state = initialState, action:AnyAction) => {

    switch (action.type) {
        case SET_INGREDIENT_INFO:
            return {
                ...state,
                currentIngridient: action?.itemCard 
            }
        case REMOVE_INGREDIENT_INFO:
            return {
                ...state,
                currentIngridient: null
            }
        default:
            return state
    }
}