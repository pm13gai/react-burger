import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import Modal from '../modals/modal'
import OrderDetails from '../modals/order-details';
import SliceCard from './slice-card';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  SET_BUN,
  ADD_INGREDIENT,
  CHANGE_INGREDIENTS_ORDER
} from '../../services/actions/order';

import {
  INCREMENT_INGREDIENT_COUNT
} from '../../services/actions/menu';

import { postIngredients, CLEAR_ORDER_DETAILS } from '../../services/actions/order-details';

import styles from './burger-constructor.module.scss'




const BurgerConstructor = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const dispatch = useDispatch();
  const ingredientsOrder = useSelector(store => store.order);
  const orderNumber = useSelector(store => store.orderDetails.number);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      if (item.type === 'bun') {
        dispatch({ type: SET_BUN, bun: item });
      } else {
        dispatch({ type: ADD_INGREDIENT, ingredient: { ...item, idForConstructor: item._id + item.count } });
      }
      dispatch({ type: INCREMENT_INGREDIENT_COUNT, ingredient: item });

    },
  });
  const borderHover = isHover ? styles.borderHover : '';



  const handleOpenModal = () => {

    dispatch(postIngredients({
      ingredients: [ingredientsOrder.bun._id, ...ingredientsOrder.ingredients]
    }));

    setModalIsVisible(true);
  }

  const handleCloseModal = () => {
    dispatch({ type: CLEAR_ORDER_DETAILS });
    setModalIsVisible(false);
  }


  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch({ type: CHANGE_INGREDIENTS_ORDER, dragIndex: dragIndex, hoverIndex: hoverIndex })
  }, [dispatch])


  return (
    <div className={`${styles.burgerConstructor} ${borderHover} flex flex-column`} ref={dropTarget}>
      <div className="pl-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={ingredientsOrder.bun.price}
          thumbnail={ingredientsOrder.bun.image}
        />
      </div>

      <div className={`${styles.list} flex flex-column`}>
        {ingredientsOrder.ingredients.map((el, index) => (
          <SliceCard
            options={el}
            index={index}
            moveCard={moveCard}
            key={el.idForConstructor} />
        ))}
      </div>


      <div className="pl-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={ingredientsOrder.bun.price}
          thumbnail={ingredientsOrder.bun.image}
        />
      </div>


      <div className="flex a-center j-end mt-10">
        <div className={`${styles.sumPrice} mr-2`}>
          {ingredientsOrder.totalPrice}
        </div>
        <div className={`${styles.currIcon} mr-10`}><CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {modalIsVisible && (<Modal onClose={handleCloseModal}>
        {orderNumber ? <OrderDetails /> : 'Отправляю заказ...'}
      </Modal>)}

    </div>

  )
}

export default BurgerConstructor;


