import React from "react";
import Appstyles from "./App.module.css";
import { Appheader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";

function App() {
  return (
    <>
      <Appheader />
      <main className={Appstyles.body}>
          <BurgerIngredients />
          <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
