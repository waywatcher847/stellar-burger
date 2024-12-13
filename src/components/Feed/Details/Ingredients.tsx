import { useMemo } from "react";
import styles from "./Details.module.css";
import Ingredient from "./Ingredient";
import { UniqueItem as TIngredient } from "../../../utils/Types";

type TIngredientsProps = {
  items: TIngredient[] | null;
};

export const Ingredients = ({ items }: TIngredientsProps) => {
  const uniqueItems = useMemo(() => {
    const uniqueIngredients = Array.from(new Set(items));
    if (!uniqueIngredients.length) return [];
    return uniqueIngredients.map((ingredient) => {
      const length = items?.filter(
        (item) => item.item._id === ingredient.item._id,
      ).length;

      return { ...ingredient, length };
    });
  }, [items]);

  return (
    <div className={`custom-scroll ${styles.ingredientcontainer}`}>
      <ul className={styles.ingredientlist}>
        {uniqueItems?.map((ingredient, i) => (
          <li className={styles.ingredientrow} key={ingredient?.uniqid || i}>
            <Ingredient ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </div>
  );
};
