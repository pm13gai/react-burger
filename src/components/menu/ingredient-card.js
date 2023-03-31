import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ingredientPropTypes } from "../../utils/ingredient-type"
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import {
  SET_INGREDIENT_FOR_MODAL
} from '../../services/actions/ingredient-details';

import styles from './ingredient-card.module.scss'

const IngredientCard = ({ options }) => {
  const dispatch = useDispatch();

  const [, drag] = useDrag({
    type: "ingredient",
    item: options
  });


  const handleClick = () => {
    dispatch({ type: SET_INGREDIENT_FOR_MODAL, ingredient: options })
  }



  return (
    <div className={`${styles.card} flex flex-column a-center p-3`} onClick={handleClick} ref={drag}>
      <Counter count={options.count} size="default" extraClass="m-1" />
      <div><img alt={options.name} src={options.image} /></div>
      <div className="flex a-center">
        <div className={`${styles.price} mr-2`}>{options.price}</div>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name}>{options.name}</p>

    </div>
  )
}

export default IngredientCard;



IngredientCard.propTypes = {
  options: ingredientPropTypes,
};