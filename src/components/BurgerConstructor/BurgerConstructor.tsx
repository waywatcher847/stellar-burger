import { useState } from "react";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { plugData } from "../../utils/data";
import { Stack } from "../../utils/burgerStack";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../utils/propTypes";
import { BurgerStackProps } from "../../utils/propTypes";

export const BurgerStack = (props: BurgerStackProps) => {
  const { idList, itemList } = props;
  return (
    <>
      {idList.map((ingredientId, i) => {
        const itemInfo = itemList.find(
          (element) => element._id === ingredientId,
        );

        if (!itemInfo) {
          console.error(`Неизвестный ингредиент с ID: ${ingredientId}`);
          return null;
        }

        return (
          <div className="pb-4" key={ingredientId}>
            <ConstructorElement
              isLocked={false}
              text={itemInfo.name}
              price={itemInfo.price}
              thumbnail={itemInfo.image}
            />
          </div>
        );
      })}
    </>
  );
};
export const BurgerConstructor = () => {
  const topBunInfo = plugData.find(
    (element) => element._id === "60666c42cc7b410027a1a9b1",
  );
  const botBunInfo = plugData.find(
    (element) => element._id === "60666c42cc7b410027a1a9b1",
  );
  if (topBunInfo === undefined || botBunInfo === undefined) {
    console.error(`Неизвестный ингредиент с ID: 60666c42cc7b410027a1a9b1`);
    return null;
  }

  return (
    <section className={burgerConstructorStyles.section}>
      <div className={burgerConstructorStyles.burgerWrapper}>
        <div className="pb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={topBunInfo.name}
            price={topBunInfo.price}
            thumbnail={topBunInfo.image}
          />
        </div>
        <div className={burgerConstructorStyles.burgerStack}>
          <BurgerStack idList={Stack} itemList={plugData} />
        </div>
        <div className="pt-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={botBunInfo.name}
            price={botBunInfo.price}
            thumbnail={botBunInfo.image}
          />
        </div>
      </div>
      <div className={burgerConstructorStyles.Footer}>
        <div className={burgerConstructorStyles.Price}>
          <p className="text text_type_digits-medium">890</p>
          <CurrencyIcon className="pl-4 pr-4" type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
