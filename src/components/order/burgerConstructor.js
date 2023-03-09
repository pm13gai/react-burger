import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modals/modal'
import { ingredientPropTypes } from "../../utils/ingredientType"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png'

import styles from './burgerConstructor.module.scss'
import IngredientDetails from '../modals/ingredientDetails';
import OrderDetails from '../modals/orderDetails';

const BurgerConstructor = ({ ingredientsList, onChangeIngredientsList, bunDetails }) => {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [ingredientForModal, setIngredientForModal] = useState(null);



  const handleOpenModal = () => {
    setModalIsVisible(true);
  }

  const handleCloseModal = () => {
    setModalIsVisible(false);
    setIngredientForModal(null);
  }


  const handleClickOnIngredient = (e, ingredient) => {
    setIngredientForModal(ingredient);
    setModalIsVisible(true);
  }

  const handleClose = (e) => {
    e.stopPropagation();
    let id = e.target.closest('div.li').getAttribute('id');
    onChangeIngredientsList(id);
  }


  return (
    <div className={`${styles.burgerConstructor} flex flex-column`}>
      <div className="pl-8" onClick={e => handleClickOnIngredient(e, bunDetails)}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={bunDetails.price}
          thumbnail={img}
        />
      </div>

      <div className={`${styles.list} flex flex-column`}>
        {ingredientsList.map(el => (<div id={el.idForList} key={el.idForList} className="li flex a-center">
          <DragIcon type="primary" />
          <div className="w100pcnt" onClick={e => handleClickOnIngredient(e, el)}>
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el.image}
              handleClose={handleClose}
            />
          </div>

        </div>))}
      </div>


      <div className="pl-8" onClick={e => handleClickOnIngredient(e, bunDetails)}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={bunDetails.price}
          thumbnail={img}
        />
      </div>


      <div className="flex a-center j-end mt-10">
        <div className={`${styles.sumPrice} mr-2`}>{ingredientsList.reduce((sum, el) => sum + el.price, 0) + bunDetails.price * 2}</div>
        <div className={`${styles.currIcon} mr-10`}><CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {modalIsVisible && (<Modal header={ingredientForModal ? 'Детали ингредиента' : null} onClose={handleCloseModal}>
        {ingredientForModal ?
          <IngredientDetails options={ingredientForModal} />
          :
          <OrderDetails />}
      </Modal>)}

    </div>

  )
}

export default BurgerConstructor;



BurgerConstructor.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  onChangeIngredientsList: PropTypes.func,
  bunDetails: ingredientPropTypes
};