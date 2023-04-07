import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../modals/modal'
import OrderDetails from '../modals/order-details';
import SliceCard from './slice-card';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  setBun,
  addIngredient,
  changeIngredientsOrder
} from '../../services/actions/order';

import {
  INCREMENT_INGREDIENT_COUNT
} from '../../services/actions/menu';

import { postIngredients, CLEAR_ORDER_DETAILS } from '../../services/actions/order-details';

import styles from './burger-constructor.module.scss'
import { useNavigate } from 'react-router-dom';




const BurgerConstructor = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredientsOrder = useSelector(store => store.order);
  const orderNumber = useSelector(store => store.orderDetails.number);
  const user = useSelector(store => store.auth.user);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      if (item.type === 'bun') {
        dispatch(setBun(item));
      } else {
        dispatch(addIngredient({ ...item, idForConstructor: uuidv4() }));
      }
      dispatch({ type: INCREMENT_INGREDIENT_COUNT, ingredient: item });

    },
  });
  const borderHover = isHover ? styles.borderHover : '';



  const handleOpenModal = () => {

    if (!user) {
      navigate('/login');
      return;
    }
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
    dispatch(changeIngredientsOrder(dragIndex, hoverIndex));
  }, [dispatch])


  return (
    <div className={`${styles.burgerConstructor} ${borderHover} flex flex-column`} ref={dropTarget}>
      {ingredientsOrder.bun && (
        <div className="pl-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={ingredientsOrder.bun.price}
            thumbnail={ingredientsOrder.bun.image}
          />
        </div>
      )}
      {!ingredientsOrder.bun && (ingredientsOrder.ingredients.length === 0) && (
        <div className={styles.defaultLabel}>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</div>
      )}

      <div className={`${styles.list} flex flex-column`}>
        {ingredientsOrder.ingredients.map((el, index) => (
          <SliceCard
            options={el}
            index={index}
            moveCard={moveCard}
            key={el.idForConstructor} />
        ))}
      </div>


      {ingredientsOrder.bun && (
        <div className="pl-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={ingredientsOrder.bun.price}
            thumbnail={ingredientsOrder.bun.image}
          />
        </div>
      )}



      <div className="flex a-center j-end mt-10">
        <div className={`${styles.sumPrice} mr-2`}>
          {ingredientsOrder.totalPrice}
        </div>
        <div className={`${styles.currIcon} mr-10`}><CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal} disabled={!ingredientsOrder.bun}>
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


