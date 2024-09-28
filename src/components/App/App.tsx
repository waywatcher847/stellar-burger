import { fetchData } from "../../Utils1/Types";
import styles from "./App.module.css";
import { Appheader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { Burgeringredients } from "../BurgerIngredients/BurgerIngredients";
import { getIngredientList } from "../../Utils1/FetchHoc1";

function app(props: fetchData) {
  const { fetchedData, loading, error } = props;

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  if (fetchedData === null) return null;
  return (
    <>
      <Appheader />
      <main className={styles.body}>
        <Burgeringredients data={fetchedData.data} />
        <BurgerConstructor data={fetchedData.data} />
      </main>
    </>
  );
}

export default getIngredientList(app);
