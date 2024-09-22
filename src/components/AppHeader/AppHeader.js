import React from 'react';
import headerstyles from './AppHeader.module.css';
import {BurgerIcon,ListIcon,ProfileIcon}from "../../icons";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";

class NavigationItem extends React.Component {
  render() {
    return (
      <button className={headerstyles.button}
              type='button'>
        <this.props.icon type="secondary"/>
        <p className="text text_type_main-default text_color_inactive" >{this.props.text}</p>
      </button>
    );
  }
}
class Appheader extends React.Component {
    render() {
      return (
        <header className={headerstyles.header}>
          <nav className={headerstyles.menuWrapper}>
            <u1 className={headerstyles.menu}>
              <li className={headerstyles.menuItem}> 
                <NavigationItem icon = {BurgerIcon} text='Конструктор'> </NavigationItem>
                <NavigationItem icon = {ListIcon} text='Лента заказов'> </NavigationItem>
              </li>
              <li className={headerstyles.logo}>
                <Logo/>
              </li>
              <li> 
                <NavigationItem icon = {ProfileIcon} text='Личный кабинет' alignRight={true} > </NavigationItem>
              </li>
            </u1>
         </nav>
        </header>
       );
  }
}
  
export default Appheader; 