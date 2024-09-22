import React from 'react';
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import plugData from '../../utils/data.json';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TabIngredientPropType} from '../../utils/propTypes.js';
import PropTypes from 'prop-types';


class BurgerStack extends React.Component {
  render() { 
    return (   
      this.props.ingridients.map((ingridientId, i)=>{ if ( this.props.allData.find((element) => element._id === ingridientId) !==  "undefined" ){ 
        const itemInfo =this.props.allData.find((element) => element._id === ingridientId)
        return <div className = 'pb-4'>
                  <ConstructorElement
                    type='middle'
                    isLocked={false}
                    text={itemInfo.name}
                    price={itemInfo.price}
                    thumbnail={itemInfo.image}/>
                </div>  
      }})
)}}
class BurgerConstructor extends React.Component {
  
  state = { burgerStack: 
    [ "60666c42cc7b410027a1a9b5",
      "60666c42cc7b410027a1a9b7",
      "60666c42cc7b410027a1a9b6",
      "60666c42cc7b410027a1a9b4",
      "60666c42cc7b410027a1a9b9",
      "60666c42cc7b410027a1a9b8",
      "60666c42cc7b410027a1a9bc",
      "60666c42cc7b410027a1a9bb",
      "60666c42cc7b410027a1a9ba",
      "60666c42cc7b410027a1a9bd" ] 
   };

  // const openModal = ()=>{ };

    render() {
      
  const topBunInfo = plugData.find((element) => element._id === "60666c42cc7b410027a1a9b1");
  const botBunInfo = plugData.find((element) => element._id === "60666c42cc7b410027a1a9b1");

      return (
        <section className={burgerConstructorStyles.section}>
          <div className={burgerConstructorStyles.burgerWrapper}>
            <div className = 'pb-4'>
              <ConstructorElement 
                type='top'
                isLocked={true}
                text={topBunInfo.name}
                price={topBunInfo.price}
                thumbnail={topBunInfo.image}/>
            </div>
            <div className={burgerConstructorStyles.burgerStack}>
              <BurgerStack  ingridients = {this.state.burgerStack} allData={plugData}/>
            </div>
            <div className = 'pt-4'>
              <ConstructorElement 
                type='bottom'
                isLocked={true}
                text={botBunInfo.name}
                price={botBunInfo.price}
                thumbnail={botBunInfo.image}/>
            </div>
          </div>
          <div className={burgerConstructorStyles.Footer}>
            <div className={burgerConstructorStyles.Price}>
              <p className='text text_type_digits-medium'>890
                <CurrencyIcon className="pl-4 pr-4" type="primary" />
              </p>
            </div>
            <Button type="primary" size="medium">Оформить заказ</Button> 
          </div>
        </section>
      );
    }
}
  
BurgerStack.propTypes = { ingridients:  PropTypes.arrayOf(PropTypes.string),
  allData: {TabIngredientPropType} };

export default BurgerConstructor; 