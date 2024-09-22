import React from 'react';
import './App.css';
import Appheader from '../AppHeader/AppHeader.js';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';


class App extends React.Component {
  render() { 

  return (
    <>
      <Appheader />
      <main className="App-body">
        <BurgerIngredients className="App-bodypart"/>
        <BurgerConstructor className="App-bodypart"/>
      </main>
    </>
  );
}
}

export default App;

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

