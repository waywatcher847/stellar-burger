import React, { useState } from "react";
import styles from "./BurgerIngredients.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
// import { plugData } from "../../utils/data";
import {
  ingredientCardProps,
  ingredientPanelProps,
  burgerTabProps,
} from "../../Utils1/Types";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { burgeringredientProps } from "../../Utils1/Types";

const IngredientCard = (props: ingredientCardProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { idx, itemCard } = props;

  return (
    <div
      role="button"
      onClick={() => setIsModalOpen(true)}
      className={`${styles.cardContainer} scroll`}
      key={idx}
    >
      <Counter count={idx}></Counter>

      <img src={itemCard.image} alt={itemCard.name}></img>
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
            setIsModalOpen(false);
          }}
          title={"Детали ингридиента"}
        >
          <IngredientDetails ingredient={itemCard} />
        </Modal>
      )}
    </div>
  );
};

const IngredientPanel = (props: ingredientPanelProps) => {
  const { currentTab, data } = props;

  const itemType = (() => {
    switch (currentTab) {
      case "Булки":
        return "bun";
      case "Начинки":
        return "main";
      case "Соусы":
        return "sauce";
      default:
        return "bun";
    }
  })();
  return (
    <>
      {data
        .filter((item) => item.type === itemType)
        .map((item, i) => (
          <IngredientCard idx={i} itemCard={item} key={i} />
        ))}
    </>
  );
};

const BurgerTab = (props: burgerTabProps) => {
  const { tabName, currentTab, clickHandler } = props;

  return (
    <Tab
      value={tabName}
      active={currentTab === tabName}
      onClick={(currentTab) => clickHandler(currentTab)}
    >
      {tabName}
    </Tab>
  );
};

export const Burgeringredients = (props: burgeringredientProps) => {
  const { data } = props;

  const [tab, setTab] = useState<string>("Булки");
  const clickHandler = (p: string) => {
    setTab(p);
  };

  return (
    <section className={styles.section}>
      <header className="text text_type_main-large">Собери бургер</header>
      <nav className={styles.nav}>
        <BurgerTab
          tabName="Булки"
          currentTab={tab}
          clickHandler={clickHandler}
        />
        <BurgerTab
          tabName="Начинки"
          currentTab={tab}
          clickHandler={clickHandler}
        />
        <BurgerTab
          tabName="Соусы"
          currentTab={tab}
          clickHandler={clickHandler}
        />
      </nav>
      <header className="text_type_main-medium">{tab}</header>
      <div className={styles.cardPanel}>
        <IngredientPanel currentTab={tab} data={data} />
      </div>
    </section>
  );
};
