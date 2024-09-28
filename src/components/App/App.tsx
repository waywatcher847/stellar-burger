import { FetchedData } from "../../utils/propTypes";
import Appstyles from "./App.module.css";
import { Appheader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { withFetch } from "../../utils/fetchHoc";

function App(props: FetchedData) {
  const { fetchedData, loading, error } = props;

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  if (fetchedData === null) return null;
  return (
    <>
      <Appheader />
      <main className={Appstyles.body}>
        <BurgerIngredients data={fetchedData.data} />
        <BurgerConstructor data={fetchedData.data} />
      </main>
    </>
  );
}

export default withFetch(App);
