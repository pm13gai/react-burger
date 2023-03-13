import { useState, useContext, useReducer, useEffect } from 'react';
import Modal from '../modals/modal'
import OrderDetails from '../modals/orderDetails';
import { ingredientPropTypes } from "../../utils/ingredientType"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png'
import { IngredientsListContext } from '../../utils/appContext'
import { postIngredients } from '../../utils/burgerApi'
import styles from './burgerConstructor.module.scss'


function reducer(state, action) {
  let sum = action.list.reduce((sum, el) => sum + el.price, 0) + action.bunDetails.price * 2;
  return { total: sum };
}


const BurgerConstructor = ({ bunDetails }) => {
  const { ingredientsList, setIngredientsList } = useContext(IngredientsListContext);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const [priceState, priceDispatcher] = useReducer(reducer, { total: bunDetails.price * 2 }, undefined);

  useEffect(() => {
    priceDispatcher({ type: 'getSum', list: ingredientsList, bunDetails: bunDetails });
  }, [ingredientsList, bunDetails])

  const handleOpenModal = () => {

    postIngredients({
      ingredients: [bunDetails._id, ...ingredientsList]
    })
      .then(data => { setOrderNumber(data.order.number) })
      .catch(error => { console.log(error) })

    setModalIsVisible(true);
  }

  const handleCloseModal = () => {
    setOrderNumber(null);
    setModalIsVisible(false);
  }


  const handleClose = (e) => {
    e.stopPropagation();
    let id = e.target.closest('div.li').getAttribute('id');
    setIngredientsList(ingredientsList.slice(0).filter((el) => el.idForList !== id))
  }


  return (
    <div className={`${styles.burgerConstructor} flex flex-column`}>
      <div className="pl-8">
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
          <div className="w100pcnt">
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el.image}
              handleClose={handleClose}
            />
          </div>

        </div>))}
      </div>


      <div className="pl-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={bunDetails.price}
          thumbnail={img}
        />
      </div>


      <div className="flex a-center j-end mt-10">
        <div className={`${styles.sumPrice} mr-2`}>
          {/* {ingredientsList.reduce((sum, el) => sum + el.price, 0) + bunDetails.price * 2} */}
          {priceState.total}
        </div>
        <div className={`${styles.currIcon} mr-10`}><CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {modalIsVisible && orderNumber && (<Modal onClose={handleCloseModal}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>)}

    </div>

  )
}

export default BurgerConstructor;



BurgerConstructor.propTypes = {
  bunDetails: ingredientPropTypes
};