import styles from "./IngredientDetails.module.css";

import { IngredientDetailsProps } from "../../utils/propTypes";

export const IngredientDetails = (props: IngredientDetailsProps) => {
  const { ingredient } = props;

  return (
    <div className={styles.wrapper}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <div className={styles.header}>
        <p className="text_type_main-medium">{ingredient.name}</p>
      </div>
      <div className={styles.text}>
        <p className="text text_type_main-small pr-4">
          Калории,ккал
          <br />
          {ingredient.calories}
        </p>
        <p className="text text_type_main-small pr-4">
          Белки,г
          <br />
          {ingredient.proteins}
        </p>
        <p className="text text_type_main-small pr-4">
          Жиры, г<br />
          {ingredient.fat}
        </p>
        <p className="text text_type_main-small">
          Углеводы, г<br />
          {ingredient.carbohydrates}
        </p>
      </div>
    </div>
  );
};
