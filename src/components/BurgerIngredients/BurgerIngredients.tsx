import { useState, useRef, useEffect } from "react";
import styles from "./BurgerIngredients.module.css";
import { IngredientPanel } from "./IngredientPanel";
import { BurgerTab } from "./BurgerTab";
import { selectIngredients } from "../../services/slices/IngredientsSlice";
import { useSelector, useDispatch } from "../../services/store";

export const Burgeringredients = () => {
  const ingridients = useSelector(selectIngredients);
  const tabRef = useRef<HTMLElement | null>(null);

  const [tab, setTab] = useState<string>("Булки");

  const clickHandler = (p: string) => {
    // setTab(p);
  };

  const headerRefs = useRef<(HTMLElement | null)[]>([]);
  const handleIntersection = (entry: IntersectionObserverEntry) => {
    if (
      entry.isIntersecting ||
      (entry.target.id !== "Булки" && entry.target.id !== "Соусы")
    ) {
      setTab(entry.target.id);
    }
  };
  useEffect(() => {
    const options = {
      root: document.getElementById("scrollDiv"),
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.reverse().forEach(handleIntersection);
    }, options);

    headerRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      headerRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section className={styles.section}>
      <header className="text text_type_main-large">Собери бургер</header>
      <nav ref={tabRef} id="my-section" className={styles.nav}>
        <BurgerTab
          tabName="Булки"
          currentTab={tab}
          clickHandler={() => clickHandler("Булки")}
        />
        <BurgerTab
          tabName="Начинки"
          currentTab={tab}
          clickHandler={() => clickHandler("Начинки")}
        />
        <BurgerTab
          tabName="Соусы"
          currentTab={tab}
          clickHandler={() => clickHandler("Соусы")}
        />
      </nav>
      <div className={styles.cardPanelGroup} id="scrollDiv">
        <header
          id="Булки"
          ref={(el) => (headerRefs.current[1] = el)}
          className="text_type_main-medium pt-4 pb-4"
        >
          Булки
        </header>
        <div className={styles.cardPanel}>
          <IngredientPanel currentTab="Булки" data={ingridients.data} />
        </div>
        <header
          id="Начинки"
          ref={(el) => (headerRefs.current[3] = el)}
          className="text_type_main-medium pt-4 pb-4"
        >
          Начинки
        </header>
        <div className={styles.cardPanel}>
          <IngredientPanel currentTab="Начинки" data={ingridients.data} />
        </div>
        <header
          id="Соусы"
          ref={(el) => (headerRefs.current[6] = el)}
          className="text_type_main-medium pt-4 pb-4"
        >
          Соусы
        </header>
        <div className={styles.cardPanel}>
          <IngredientPanel currentTab="Соусы" data={ingridients.data} />
        </div>
      </div>
    </section>
  );
};
