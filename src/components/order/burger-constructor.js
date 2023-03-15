import { useState, useContext, useReducer, useMemo } from 'react';
import Modal from '../modals/modal'
import OrderDetails from '../modals/order-details';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png'
import { IngredientsOrderContext } from '../../utils/app-context'
import { postIngredients } from '../../utils/burger-api'
import styles from './burger-constructor.module.scss'


function reducer(state, action) {
  let sum = action.order.ingredients.reduce((sum, el) => sum + el.price, 0) + action.order.bun.price * 2;
  return { total: sum };
}


const BurgerConstructor = () => {
  const { ingredientsOrder, setIngredientsOrder } = useContext(IngredientsOrderContext);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const [priceState, priceDispatcher] = useReducer(reducer, { total: ingredientsOrder.bun.price * 2 }, undefined);

  useMemo(() => {
    priceDispatcher({ type: 'getSum', order: ingredientsOrder });
  }, [ingredientsOrder])

  const handleOpenModal = () => {

    postIngredients({
      ingredients: [ingredientsOrder.bun._id, ...ingredientsOrder.ingredients]
    })
      .then(data => {
        setOrderNumber(data.order.number);
        setIngredientsOrder({
          ...ingredientsOrder,
          ingredients: []
        });
      })
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
    setIngredientsOrder({
      ...ingredientsOrder,
      ingredients: ingredientsOrder.ingredients.slice(0).filter((el) => el.idForList !== id)
    })
  }


  return (
    <div className={`${styles.burgerConstructor} flex flex-column`}>
      <div className="pl-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={ingredientsOrder.bun.price}
          thumbnail={img}
        />
      </div>

      <div className={`${styles.list} flex flex-column`}>
        {ingredientsOrder.ingredients.map(el => (<div id={el.idForList} key={el.idForList} className="li flex a-center">
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
          price={ingredientsOrder.bun.price}
          thumbnail={img}
        />
      </div>


      <div className="flex a-center j-end mt-10">
        <div className={`${styles.sumPrice} mr-2`}>
          {priceState.total}
        </div>
        <div className={`${styles.currIcon} mr-10`}><CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {modalIsVisible && (<Modal onClose={handleCloseModal}>
        {orderNumber ? <OrderDetails orderNumber={orderNumber} /> : 'Отправляю заказ...'}
      </Modal>)}

    </div>

  )
}

export default BurgerConstructor;


