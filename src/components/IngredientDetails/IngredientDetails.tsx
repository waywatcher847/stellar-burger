import styles from "./IngredientDetails.module.css";
import { RootReducerType } from "../../utils/Types";
import { useSelector, useDispatch } from "react-redux";

export const IngredientDetails = () => {
  const dispatch: any = useDispatch();
  const { loading, currentIngridient } = useSelector(
    (store: RootReducerType) => store.currentIngridient,
  );

  return (
    <div className={styles.wrapper}>
      <img src={currentIngridient.image_large} alt={currentIngridient.name} />
      <div className={styles.header}>
        <p className="text_type_main-medium">{currentIngridient.name}</p>
      </div>
      <div className={styles.text}>
        <p className="text text_type_main-small pr-4">
          Калории,ккал
          <br />
          {currentIngridient.calories}
        </p>
        <p className="text text_type_main-small pr-4">
          Белки,г
          <br />
          {currentIngridient.proteins}
        </p>
        <p className="text text_type_main-small pr-4">
          Жиры, г<br />
          {currentIngridient.fat}
        </p>
        <p className="text text_type_main-small">
          Углеводы, г<br />
          {currentIngridient.carbohydrates}
        </p>
      </div>
    </div>
  );
};
