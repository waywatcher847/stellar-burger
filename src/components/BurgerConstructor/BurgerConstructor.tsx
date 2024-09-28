import React, { useState, useEffect } from "react";
import styles from "./BurgerConstructor.module.css";
// import { plugData } from "../../utils/data";
// import { plugStack } from "../../utils/burgerStack";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { burgerStackProps } from "../../Utils/Types";
import { burgerConstructorProps } from "../../Utils/Types";
import { idList } from "../../Utils/Types";

export const BurgerStack = (props: burgerStackProps) => {
  const { idList, itemList } = props;
  return (
    <>
      (
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
      )
    </>
  );
};
export const BurgerConstructor = (props: burgerConstructorProps) => {
  const { data } = props;

  const meatStack: idList = data
    .filter((item) => item.type === "main")
    .map((item) => item._id);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const topBunInfo = data.find(
    (element) => element.name === "Краторная булка N-200i",
  );
  const botBunInfo = data.find(
    (element) => element.name === "Краторная булка N-200i",
  );
  if (topBunInfo === undefined || botBunInfo === undefined) {
    throw new Error(`Неизвестный ингредиент "Краторная булка N-200i"`);
  }

  return (
    <section className={styles.section}>
      <div className={styles.burgerWrapper}>
        <div className="pb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={topBunInfo.name}
            price={topBunInfo.price}
            thumbnail={topBunInfo.image}
          />
        </div>
        <div className={styles.burgerStack}>
          <BurgerStack idList={meatStack} itemList={data} />
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
      <div className={styles.Footer}>
        <div className={styles.Price}>
          <p className="text text_type_digits-medium pr-4">12345</p>
          <CurrencyIcon className={styles.Icon} type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => setIsModalOpen(true)}
        >
          Оформить заказ
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onClose={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              <OrderDetails orderID={12345} />
            </Modal>
          )}
        </Button>
      </div>
    </section>
  );
};
