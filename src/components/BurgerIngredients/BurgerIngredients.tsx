import { useState } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { plugData } from "../../utils/data";
import {
  ingredientCardProps,
  IngredientPanelProps,
  BurgerTabProps,
} from "../../utils/propTypes";

const IngredientCard = (props: ingredientCardProps) => {
  const { idx, itemCard } = props;

  return (
    <div className={burgerIngredientsStyles.cardContainer}>
      <Counter count={idx}></Counter>
      <img src={itemCard.image} />
      <div className={burgerIngredientsStyles.cardPrice}>
        <p className="text text_type_digits-medium">{itemCard.price}</p>
        <div className="pl-4">
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <br />
      <div className={burgerIngredientsStyles.cardPrice}>
        <p className="text text_type_main-small">{itemCard.name}</p>
      </div>
    </div>
  );
};

const IngredientPanel = (props: IngredientPanelProps) => {
  const { currentTab } = props;

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
      { plugData
        .filter((item) => item.type === itemType)
        .map((item, i) => <IngredientCard idx={i} itemCard={item} />)
      };
  </>
  )
};

const BurgerTab = (props: BurgerTabProps) => {
  const { tabName, currentTab, clickHandler } = props;

  return (
    <Tab
      value={tabName}
      active={currentTab === tabName}
      onClick={( currentTab ) => clickHandler(currentTab)}
    >
      {tabName}
    </Tab>
  );
};

export const BurgerIngredients = () => {
  const [tab, setTab] = useState<string>("Булки");
  const clickHandler = (p: string) => {
    setTab(p);
  };

  return (
    <section className={burgerIngredientsStyles.section}>
      <header className="text text_type_main-large">Собери бургер</header>
      <nav className={burgerIngredientsStyles.nav}>
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
      <div className={burgerIngredientsStyles.cardPanel}>
        <IngredientPanel currentTab={tab} />
      </div>
    </section>
  );
};
