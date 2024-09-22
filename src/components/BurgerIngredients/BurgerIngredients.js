import React from 'react';
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import plugData from '../../utils/data.json';
import {IngredientPropType} from '../../utils/propTypes.js';
import PropTypes from 'prop-types';


class IngredientCard extends React.Component {
  render() { 
    return (
        <div className={burgerIngredientsStyles.cardContainer}>
          {/* <div className={burgerIngredientsStyles.cardCounter}>
            <p1 className='text text_type_digits-default'></p1>
          </div> */}
          <Counter count={this.props.itemIdx}></Counter>
          <img src={this.props.itemCard.image}/>
          <div className={burgerIngredientsStyles.cardPrice}>
            <p1 className='text text_type_digits-medium'>{this.props.itemCard.price}</p1>
            <CurrencyIcon className="pl-4"/>
          </div>
          <br/>
          <div className={burgerIngredientsStyles.cardPrice}>
            <p1 className='text text_type_main-small'>{this.props.itemCard.name}</p1>
          </div>
        </div>
  )}}

class IngredientPanel extends React.Component {

  state={ modalOpen : false }

  render() { 
    const itemType = (()=>{ 
      switch(this.props.currentState){
        case 'Булки': return 'bun' ;
        case 'Начинки': return 'main';
        case 'Соусы': return 'sauce';
        default: return 'bun';
      }})();
    return (   
       plugData.filter((item)=>(item.type === itemType )).map((item, i) =>     
        <IngredientCard itemIdx={i} itemCard={item}/>
       )
)}}
class BurgerTab extends React.Component {
  render() { return (
    <Tab  value = { this.props.tabName }
          active = {String(this.props.currentState) === String(this.props.tabName)}
          onClick={ (i)  => { this.props.clickHandler( i ) } }>
    {this.props.tabName}</Tab>
  )}}


class BurgerIngredients extends React.Component {

  constructor(props) { super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  state = { tab: "Булки" };

  clickHandler( p ){ this.setState( { tab: ( p ) }) }

  render() {
      return (
        <section className={burgerIngredientsStyles.section}>
          <header className="text text_type_main-large">Собери бургер</header>
          <nav className={burgerIngredientsStyles.nav}>
            <BurgerTab tabName = 'Булки'   currentState = {this.state.tab} clickHandler={this.clickHandler}/>
            <BurgerTab tabName = 'Начинки' currentState = {this.state.tab} clickHandler={this.clickHandler}/>
            <BurgerTab tabName = 'Соусы'   currentState = {this.state.tab} clickHandler={this.clickHandler}/>
          </nav>
          <header className="text_type_main-medium">{this.state.tab}</header>
          <div className={burgerIngredientsStyles.cardPanel}>
            <IngredientPanel  currentState = {this.state.tab}/>
          </div>
        </section>
      );
    }
}

IngredientCard.propTypes = { itemIdx: PropTypes.number,
                              itemCard: {IngredientPropType} };

export default BurgerIngredients; 