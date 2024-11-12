import styles from "./IngredientDetails.module.css";
import { useSelector } from "../../services/store";
import { useParams } from "react-router-dom";
import { selectIngredients } from "../../services/slices/IngredientsSlice";

export const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const clickedIngridient = useSelector(
    (store) => store.currentIngridient.ingredient,
  );
  const ingridients = useSelector(selectIngredients);

  const selectedIngredient = ingridients.data.find(
    (ingredient) => ingredient._id === id,
  );

  const currentIngridient = selectedIngredient
    ? selectedIngredient
    : clickedIngridient;

  return (
    <div className={styles.wrapper}>
      <img src={currentIngridient?.image_large} alt={currentIngridient?.name} />
      <div className={styles.header}>
        <p className="text_type_main-medium">{currentIngridient?.name}</p>
      </div>
      <div className={styles.text}>
        <p className="text text_type_main-small pr-4">
          Калории,ккал
          <br />
          {currentIngridient?.calories}
        </p>
        <p className="text text_type_main-small pr-4">
          Белки,г
          <br />
          {currentIngridient?.proteins}
        </p>
        <p className="text text_type_main-small pr-4">
          Жиры, г<br />
          {currentIngridient?.fat}
        </p>
        <p className="text text_type_main-small">
          Углеводы, г<br />
          {currentIngridient?.carbohydrates}
        </p>
      </div>
    </div>
  );
};
