import PropTypes from 'prop-types';

const IngredientPropType = PropTypes.shape({  
    _id: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
    type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired, 
    proteins: PropTypes.number.isRequired, 
    calories: PropTypes.number.isRequired, 
    fat: PropTypes.number.isRequired, 
    carbohydrates: PropTypes.number.isRequired, 
    price: PropTypes.number.isRequired, 
    image: PropTypes.string.isRequired, 
    image_mobile: PropTypes.string.isRequired, 
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
}); 

const TabIngredientPropType = {
    ingredients: PropTypes.arrayOf(IngredientPropType.isRequired).isRequired,
};

export {IngredientPropType, TabIngredientPropType}