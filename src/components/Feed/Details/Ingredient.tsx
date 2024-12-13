import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Details.module.css";
import { UniqueItem as TIngredient } from "../../../utils/Types";

type TIngredientProps = {
  ingredient?: TIngredient & { count?: number };
};

const Ingredient = ({ ingredient }: TIngredientProps) => {
  return (
    <>
      {ingredient && (
        <>
        <div className={styles.ingredientprice}>
          <img
            src={ingredient.item.image_mobile}
            alt={ingredient.item.name}
            className={styles.ingredientimage}
          />
          <p className={`text text_type_main-default ${styles.ingredientitle}`}>
            {ingredient.item.name}
          </p>
          </div>
          <div className={styles.ingredientprice}>
            <p
              className={`text text_type_digits-default ${styles.ingredientcount}`}
            >
              {ingredient.count} x {ingredient.item.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </>
      )}
    </>
  );
};

export default Ingredient;
