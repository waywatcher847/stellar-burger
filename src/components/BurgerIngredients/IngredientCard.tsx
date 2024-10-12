import styles from "./BurgerIngredients.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientCardProps } from "../../utils/Types";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { useModal } from "../../hooks/useModal";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { SET_INGREDIENT_INFO, REMOVE_INGREDIENT_INFO } from '../../services/actions/currentIngridient'
import { rootReducerType } from "../../utils/Types";


export const IngredientCard = (props: IngredientCardProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { idx, itemCard } = props;
  const { bun, ingredients } = useSelector((state:rootReducerType) => state.burgerConstrucor);


const dispatch = useDispatch();

const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { itemCard },
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
});
const count = !(itemCard.type === 'bun')
              ?ingredients.filter((ingredient) => { if (ingredient?.item?._id === itemCard?._id ) return ingredient } ).length
              :(bun?._id === itemCard._id)?2:0

return (
    <div
      role="button"
      onClick={() => {openModal(); dispatch({ type: SET_INGREDIENT_INFO, itemCard })}}
      className={`${styles.cardContainer} scroll`}
      key={idx}
    >
      <Counter count={ count }></Counter>

      <div ref={dragRef}>
      <img src={itemCard.image} alt={itemCard.name}></img>
      </div>
      <div className={styles.cardPrice}>
        <p className="text text_type_digits-medium pr-4">{itemCard.price}</p>
        <CurrencyIcon className={styles.Icon} type="primary" />
      </div>
      <br />
      <div className={styles.cardPrice}>
        <p className="text text_type_main-small">{itemCard.name}</p>
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={(e) => {
            e.stopPropagation();
            closeModal();
            dispatch({ type: REMOVE_INGREDIENT_INFO, itemCard })
          }}
          title={"Детали ингридиента"}
        >
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};
