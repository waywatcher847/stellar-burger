import { FetchData } from "../../utils/Types";
import styles from "./App.module.css";
import { useEffect } from "react";
import { Appheader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { Burgeringredients } from "../BurgerIngredients/BurgerIngredients";
import { getIngredients } from "../../services/actions/ingridients";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "../../utils/Types";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch: any = useDispatch();
  const { loading } = useSelector(
    (store: RootReducerType) => store.ingridients,
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <>
      <Appheader />
      <main className={styles.body}>
        <DndProvider backend={HTML5Backend}>
          <Burgeringredients/>
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
