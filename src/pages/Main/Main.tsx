import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "../../services/store";
import styles from "./Main.module.css";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { Burgeringredients } from "../../components/BurgerIngredients/BurgerIngredients";

export function MainPage() {
  const loading_ingredients = useSelector((state) => state.ingridients.loading);
  const loading_user = useSelector((state) => state.auth.loading);

  if (loading_ingredients || loading_user) return <div>Загрузка...</div>;

  return (
    <>
      <main className={styles.body}>
        <DndProvider backend={HTML5Backend}>
          <Burgeringredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export default MainPage;
