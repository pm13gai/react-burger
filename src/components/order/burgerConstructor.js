import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/ingredientType"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png'

import styles from './burgerConstructor.module.scss'

const BurgerConstructor = ({ ingredientsList, onChangeIngredientsList }) => {
  const handleClose = (e) => {
    let id = e.target.closest('div.li').getAttribute('id');
    onChangeIngredientsList(id);
  }
  return (
    <div className={`${styles.burgerConstructor} flex flex-column`}>
      <div className="pl-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={1255}
          thumbnail={img}
        />
      </div>

      <div className={`${styles.list} flex flex-column`}>
        {ingredientsList.map(el => (<div id={el.idForList} key={el.idForList} className="li flex a-center">
          <DragIcon type="primary" /><ConstructorElement
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            handleClose={handleClose}
          />
        </div>))}
      </div>


      <div className="pl-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={1255}
          thumbnail={img}
        />
      </div>


      <div className="flex a-center j-end mt-10">
        <div className={`${styles.sumPrice} mr-2`}>{ingredientsList.reduce((sum, el) => sum + el.price, 0) + 2510}</div>
        <div className={`${styles.currIcon} mr-10`}><CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>


    </div>

  )
}

export default BurgerConstructor;



BurgerConstructor.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  onChangeIngredientsList: PropTypes.func
};