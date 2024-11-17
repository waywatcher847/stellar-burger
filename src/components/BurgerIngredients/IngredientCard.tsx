import styles from "./BurgerIngredients.module.css";
import {
  SET_INGREDIENT_INFO,
  REMOVE_INGREDIENT_INFO,
} from "../../services/slices/CurrentIngredientSlice";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientCardProps } from "../../utils/Types";
import { Modal } from "../Modal/Modal";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "../../services/store";

export const IngredientCard = (props: IngredientCardProps) => {
  const location = useLocation();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { idx, itemCard } = props;
  const { bun, ingredients } = useSelector((state) => state.burgerConstrucor);

  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { itemCard },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const count = !(itemCard.type === "bun")
    ? ingredients.filter((ingredient) => {
        if (ingredient?.item?._id === itemCard?._id) return ingredient;
      }).length
    : bun?._id === itemCard._id
      ? 2
      : 0;

  return (
    <Link
      className={styles.cardContainer}
      to={`/ingredients/${itemCard._id}`}
      onClick={() => {
        openModal();
        dispatch(SET_INGREDIENT_INFO(itemCard));
      }}
      key={idx}
      state={{ background: location }}
    >
      <Counter count={count}></Counter>

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
    </Link>
  );
};
