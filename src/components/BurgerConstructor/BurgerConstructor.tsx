import React, { useState, useEffect } from "react";
import styles from "./BurgerConstructor.module.css";
// import { plugData } from "../../utils/data";
// import { plugStack } from "../../utils/burgerStack";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { BurgerStackProps } from "../../utils/Types";
import { BurgerConstructorProps } from "../../utils/Types";
import { IdList } from "../../utils/Types";
import { useModal } from "../../hooks/useModal";

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
          <div className={styles.burgerLine} key={ingredientId}>
            <div className={styles.dragIcon} >
              <DragIcon type="primary" />
            </div>
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
export const BurgerConstructor = (props: BurgerConstructorProps) => {
  const { data } = props;

  const meatStack: IdList = data
    .filter((item) => item.type === "main")
    .map((item) => item._id);
  const { isModalOpen, openModal, closeModal } = useModal();
  // const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        <div className={styles.burgerLine}>
        <div className={styles.dragIcon} />
          <ConstructorElement
            type="top"
            isLocked={true}
            text={topBunInfo.name + "\n(верх)"}
            price={topBunInfo.price}
            thumbnail={topBunInfo.image}
          />
        </div>
        <div className={styles.burgerStack}>
          <BurgerStack idList={meatStack} itemList={data} />
        </div>
        <div className={styles.burgerLine}>
          <div className={styles.dragIcon} />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={botBunInfo.name + "\n(низ)"}
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
          onClick={() => openModal()}
        >
          Оформить заказ
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onClose={(e) => {
                e.stopPropagation();
                closeModal();
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
