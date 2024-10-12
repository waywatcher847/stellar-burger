import { useState } from "react";
import styles from "./BurgerIngredients.module.css";
import { IngredientPanel }  from "./IngredientPanel";
import { BurgeringredientProps } from "../../utils/Types";
import { BurgerTab } from "./BurgerTab";

export const Burgeringredients = (props: BurgeringredientProps) => {
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
